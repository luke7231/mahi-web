import React, { useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type MenuEditModalProps = {
  menu: MenuItem;
  onClose: () => void;
  onSave: (updatedMenu: MenuItem) => void;
};

const MenuEditModal: React.FC<MenuEditModalProps> = ({
  menu,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(menu.name);
  const [price, setPrice] = useState<number | "">(menu.price);
  const [img, setImg] = useState(menu.img);

  const handleSubmit = () => {
    if (!name || !price || !img) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const updatedMenu: MenuItem = { ...menu, name, price: Number(price), img };
    onSave(updatedMenu);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">메뉴 수정</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            가격
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            이미지 URL
          </label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuEditModal;
