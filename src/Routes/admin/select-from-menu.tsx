import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePackContext } from "./context/pack";
import { gql, useQuery } from "@apollo/client";
import Header from "../../components/common/header";
const GET_MENUS_BY_STORE = gql`
  query GetMenusByStore($storeId: Int!) {
    menus(storeId: $storeId) {
      id
      name
      price
      img
    }
  }
`;
interface MenuItem {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number; // 수량 필드 추가
}

const SelectFromMenu: React.FC = () => {
  const navigate = useNavigate();
  const { addPack } = usePackContext();
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [discountRate, setDiscountRate] = useState(0);
  const storeId = 1; // 실제 storeId는 동적으로 가져오거나 context에서 가져오는 방식으로 수정

  const { loading, error, data } = useQuery(GET_MENUS_BY_STORE, {
    variables: { storeId },
  });

  const handleSelect = (menu: Omit<MenuItem, "quantity">) => {
    setSelectedItems(
      (prev) =>
        prev.some((item) => item?.id === menu?.id)
          ? prev.filter((item) => item?.id !== menu?.id)
          : [...prev, { ...menu, quantity: 1 }] // 기본 수량 1
    );
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item?.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const incrementQuantity = (id: number) => {
    handleQuantityChange(
      id,
      selectedItems.find((item) => item?.id === id)?.quantity! + 1
    );
  };

  const decrementQuantity = (id: number) => {
    const currentQuantity = selectedItems.find((item) => item?.id === id)
      ?.quantity!;
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  const handleComplete = () => {
    const packWithDiscount = selectedItems.map((item) => ({
      ...item,
      discountRate,
    }));
    addPack(packWithDiscount);
    navigate("/admin/pack-create"); // 팩 만들기 페이지로 이동
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const menus: Omit<MenuItem, "quantity">[] = data?.menus || [];

  return (
    <div className="min-h-screen bg-white ">
      <Header title="기존 메뉴에서 선택" showBackButton />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">기존 메뉴에서 선택</h2>

        {menus.length === 0 ? (
          <p className="text-gray-600">현재 등록된 메뉴가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {menus.map((menu) => (
              <div
                key={menu?.id}
                className={` border rounded-lg cursor-pointer ${
                  selectedItems.some((item) => item?.id === menu?.id)
                    ? "bg-[#1562fc] text-white"
                    : "bg-[#f3f3f3]"
                }`}
              >
                <div onClick={() => handleSelect(menu)}>
                  <img
                    src={menu?.img}
                    alt={menu?.name}
                    className="w-full h-28 object-cover rounded-md mb-2"
                  />
                  <div className="p-2">
                    <div className="text-lg font-semibold">{menu?.name}</div>
                    <div className="text-sm text-gray-500">
                      {menu?.price.toLocaleString()}원
                    </div>
                  </div>
                </div>

                {selectedItems.some((item) => item?.id === menu?.id) && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-white">
                      수량
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(menu?.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={
                          selectedItems.find((item) => item?.id === menu?.id)
                            ?.quantity || 1
                        }
                        onChange={(e) =>
                          handleQuantityChange(menu?.id, Number(e.target.value))
                        }
                        className="w-16 p-2 border rounded-md text-black text-center"
                      />
                      <button
                        onClick={() => incrementQuantity(menu?.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            할인율 적용 (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={discountRate}
            onChange={(e) => setDiscountRate(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {selectedItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">선택된 메뉴</h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((menu) => (
                <div key={menu?.id} className="flex items-center space-x-4">
                  <img
                    src={menu?.img}
                    alt={menu?.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <div className="text-black text-lg">{menu?.name}</div>
                    <div className="text-sm text-gray-500">
                      {menu?.price.toLocaleString()}원 (수량: {menu?.quantity})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleComplete}
            className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
          >
            완료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectFromMenu;
