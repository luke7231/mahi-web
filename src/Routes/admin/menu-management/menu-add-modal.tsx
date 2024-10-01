import React, { useState } from "react";

type MenuInput = {
  id: number;
  name: string;
  price: number;
  img: File | null; // 파일로 수정
};

type AddMenuModalProps = {
  onClose: () => void;
  onSave: (menu: MenuInput) => void;
};

const AddMenuModal: React.FC<AddMenuModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [img, setImg] = useState<File | null>(null); // 파일 타입으로 수정

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !price || !img) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const newMenu: MenuInput = {
      id: Math.random(), // 고유한 ID 생성, 실제로는 서버에서 생성된 ID 사용
      name,
      price: Number(price),
      img, // 파일로 전달
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
            이미지 업로드
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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

export default AddMenuModal;
