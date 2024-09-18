import React, { useState } from "react"; // 수정 모달 가져오기
import MenuEditModal from "./menu-edit-modal";
import AddMenuModal from "./menu-add-modal";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  img: string;
};

const MenuManagement: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      id: 1,
      name: "떡볶이",
      img: "https://d2w4my3xq5hp3v.cloudfront.net/image/goods/000/000/012/232/1.jpg?updated_at=20231114150500",
      price: 5000,
    },
    {
      id: 2,
      name: "튀김",
      img: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4951849279/B.jpg?677000000",
      price: 3000,
    },
    {
      id: 3,
      name: "순대",
      img: "https://m.haenaen.co.kr/web/product/big/202209/c38bdd1ccf6ffb5373b88ac0fba1887a.jpg",
      price: 4000,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<MenuItem | null>(null);

  const handleAddMenu = () => {
    setIsAdding(true);
  };

  const handleSaveMenu = (newMenu: MenuItem) => {
    setMenus([...menus, newMenu]);
    setIsAdding(false);
  };

  const handleEditMenu = (menu: MenuItem) => {
    setIsEditing(menu);
  };

  const handleSaveEditedMenu = (updatedMenu: MenuItem) => {
    setMenus(
      menus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
    );
    setIsEditing(null);
  };

  const handleDeleteMenu = (id: number) => {
    setMenus(menus.filter((menu) => menu.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">메뉴 관리</h1>

      {/* 메뉴 추가 버튼 */}
      <button
        onClick={handleAddMenu}
        className="mb-6 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        메뉴 추가하기
      </button>

      {/* 메뉴 목록 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div key={menu.id} className="border rounded-lg p-4">
            <img
              src={menu.img}
              alt={menu.name}
              className="h-40 w-full object-cover rounded-md mb-2"
            />
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
                onClick={() => handleDeleteMenu(menu.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default MenuManagement;
