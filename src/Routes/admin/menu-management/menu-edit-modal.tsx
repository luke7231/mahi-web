import React, { useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  img: string | null;
};
type MenuInput = {
  id: number;
  name: string;
  price: number;
  img: File | null;
};

type MenuEditModalProps = {
  menu: MenuItem;
  onClose: () => void;
  onSave: (updatedMenu: MenuInput, imgFile?: File) => void;
};

const MenuEditModal: React.FC<MenuEditModalProps> = ({
  menu,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(menu.name);
  const [price, setPrice] = useState<number | "">(menu.price);
  const [imgPreview, setImgPreview] = useState(menu.img); // 이미지 미리보기
  const [imgFile, setImgFile] = useState<File | null>(null); // 실제 파일

  const handleSubmit = () => {
    if (!name || !price) {
      alert("이름과 가격을 입력해 주세요.");
      return;
    }

    const updatedMenu: MenuInput = {
      ...menu,
      name,
      price: Number(price),
      img: imgFile,
    };
    onSave(updatedMenu);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
    }
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
            이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {imgPreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              현재 이미지
            </label>
            <img
              src={imgPreview}
              alt="미리보기"
              className="h-40 w-full object-cover rounded-md mb-2"
            />
          </div>
        )}

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
