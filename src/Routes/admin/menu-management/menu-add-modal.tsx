import React, { useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type AddMenuModalProps = {
  onClose: () => void;
  onSave: (menu: MenuItem) => void;
};

const AddMenuModal: React.FC<AddMenuModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [img, setImg] = useState("");

  const handleSubmit = () => {
    if (!name || !price || !img) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const newMenu: MenuItem = {
      id: Math.random(), // 고유한 ID 생성
      name,
      price: Number(price),
      img,
    };
    onSave(newMenu);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">메뉴 추가</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="메뉴 이름 입력"
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
            placeholder="가격 입력"
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
            placeholder="이미지 URL 입력"
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

export default AddMenuModal;
