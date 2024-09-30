import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import DeleteConfirmationModal from "./menu-delete-modal";
import MenuEditModal from "./menu-edit-modal";
import AddMenuModal from "./menu-add-modal";
import Header from "../../../components/common/header";

// GraphQL Queries & Mutations
const GET_MENUS = gql`
  query GetMenus($storeId: Int!) {
    menus(storeId: $storeId) {
      id
      name
      price
      img
    }
  }
`;
const CREATE_MENU = gql`
  mutation CreateMenu(
    $storeId: Int!
    $name: String!
    $price: Float!
    $img: Upload
  ) {
    createMenu(storeId: $storeId, name: $name, price: $price, img: $img) {
      id
      name
      price
      img
    }
  }
`;
const UPDATE_MENU = gql`
  mutation UpdateMenu($id: Int!, $name: String, $price: Float, $img: Upload) {
    updateMenu(id: $id, name: $name, price: $price, img: $img) {
      id
      name
      price
      img
    }
  }
`;

const DELETE_MENU = gql`
  mutation DeleteMenu($id: Int!) {
    deleteMenu(id: $id) {
      id
    }
  }
`;

type MenuItem = {
  id: number;
  name: string;
  price: number;
  img: string;
};
type MenuInput = {
  id: number;
  name: string;
  price: number;
  img: File | null;
};

const MenuManagement: React.FC = () => {
  const storeId = 1; // 상관 없음.
  const { data, loading, error, refetch } = useQuery(GET_MENUS, {
    variables: { storeId },
  });

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<MenuItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<MenuItem | null>(null); // 삭제할 메뉴 상태 관리

  // GraphQL Mutations
  const [createMenu] = useMutation(CREATE_MENU);
  const [updateMenu] = useMutation(UPDATE_MENU);
  const [deleteMenu] = useMutation(DELETE_MENU);

  useEffect(() => {
    if (data && data.menus) {
      setMenus(data.menus);
    }
  }, [data]);

  const handleAddMenu = () => {
    setIsAdding(true);
  };

  const handleSaveMenu = (newMenu: MenuInput) => {
    createMenu({
      variables: {
        storeId,
        name: newMenu.name,
        price: newMenu.price,
        img: newMenu.img,
      },
    }).then(() => {
      refetch(); // 메뉴 목록 새로고침
      setIsAdding(false);
    });
  };

  const handleEditMenu = (menu: MenuItem) => {
    setIsEditing(menu);
  };

  const handleSaveEditedMenu = (updatedMenu: MenuInput) => {
    updateMenu({
      variables: {
        id: updatedMenu.id,
        name: updatedMenu.name,
        price: updatedMenu.price,
        img: updatedMenu.img,
      },
    }).then(() => {
      refetch(); // 메뉴 목록 새로고침
      setIsEditing(null);
    });
  };

  const handleDeleteMenu = (id: number) => {
    deleteMenu({
      variables: { id },
    }).then(() => {
      refetch(); // 메뉴 목록 새로고침
      setIsDeleting(null); // 삭제 후 모달 닫기
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header title="메뉴관리" showBackButton />
      <div className="p-6">
        {/* 메뉴 추가 버튼 */}
        <button
          onClick={handleAddMenu}
          className="mb-6 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          메뉴 추가하기
        </button>

        {/* 메뉴 목록이 없을 경우 */}
        {menus.length === 0 ? (
          <p className="text-lg text-gray-700">등록된 메뉴가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {menus.map((menu) => (
              <div key={menu.id} className="border rounded-lg">
                <img
                  src={menu.img}
                  alt={menu.name}
                  className="h-40 w-full object-cover rounded-md mb-2"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{menu.name}</h2>
                  <p className="text-sm text-gray-600">
                    {menu.price.toLocaleString()}원
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded"
                      onClick={() => handleEditMenu(menu)}
                    >
                      수정
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded"
                      onClick={() => setIsDeleting(menu)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 메뉴 추가 모달 */}
        {isAdding && (
          <AddMenuModal
            onClose={() => setIsAdding(false)}
            onSave={handleSaveMenu}
          />
        )}

        {/* 메뉴 수정 모달 */}
        {isEditing && (
          <MenuEditModal
            menu={isEditing}
            onClose={() => setIsEditing(null)}
            onSave={handleSaveEditedMenu}
          />
        )}

        {/* 삭제 확인 모달 */}
        {isDeleting && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleting(null)}
            onConfirm={() => handleDeleteMenu(isDeleting.id)}
          />
        )}
      </div>
    </>
  );
};

export default MenuManagement;
