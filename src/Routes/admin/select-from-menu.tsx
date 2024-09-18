import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePackContext } from "./context/pack"; // 경로 수정

interface MenuItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const SelectFromMenu: React.FC = () => {
  const navigate = useNavigate();
  const { addPack } = usePackContext(); // Context에서 addPack 함수 가져오기
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [discountRate, setDiscountRate] = useState(0); // 일괄 할인율

  const handleSelect = (menu: MenuItem) => {
    setSelectedItems((prev) =>
      prev.some((item) => item.id === menu.id)
        ? prev.filter((item) => item.id !== menu.id)
        : [...prev, menu]
    );
  };

  const menus: MenuItem[] = [
    {
      id: 1,
      name: "떡볶이",
      imageUrl:
        "https://d2w4my3xq5hp3v.cloudfront.net/image/goods/000/000/012/232/1.jpg?updated_at=20231114150500",
      price: 5000,
    },
    {
      id: 2,
      name: "튀김",
      imageUrl:
        "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4951849279/B.jpg?677000000",
      price: 3000,
    },
    {
      id: 3,
      name: "순대",
      imageUrl:
        "https://m.haenaen.co.kr/web/product/big/202209/c38bdd1ccf6ffb5373b88ac0fba1887a.jpg",
      price: 4000,
    },
    // Add more menu items here
  ];

  const handleComplete = () => {
    // 팩에 할인율과 함께 추가
    const packWithDiscount = selectedItems.map((item) => ({
      ...item,
      discountRate,
    }));
    addPack(packWithDiscount);
    navigate("/admin/pack-create"); // 팩 만들기 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">기존 메뉴에서 선택</h2>
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            onClick={() => handleSelect(menu)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedItems.some((item) => item.id === menu.id)
                ? "bg-[#1562fc] text-white"
                : "bg-[#f3f3f3]"
            }`}
          >
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="w-full h-24 object-cover rounded-md mb-2"
            />
            <div className="text-lg font-semibold">{menu.name}</div>
            <div className="text-sm text-gray-500">
              {menu.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      {/* 할인율 입력 */}
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
              <div key={menu.id} className="flex items-center space-x-4">
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <div className="text-black text-lg">{menu.name}</div>
                  <div className="text-sm text-gray-500">
                    {menu.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 완료하기 버튼 */}
      <div className="mt-8">
        <button
          onClick={handleComplete}
          className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
        >
          완료하기
        </button>
      </div>
    </div>
  );
};

export default SelectFromMenu;
