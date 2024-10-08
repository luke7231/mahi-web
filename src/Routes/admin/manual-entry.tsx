import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePackContext } from "./context/pack"; // 경로 수정
import Header from "../../components/common/header";

interface ManualMenuItem {
  id: number;
  name: string;
  img: File;
  price: number;
  discountRate: number; // 할인율 추가
}

const ManualEntry: React.FC = () => {
  const { addPack } = usePackContext();
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState<number | string | "">("");
  const [discountRate, setDiscountRate] = useState<number | string | "">(40); // 할인율 추가
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일로 받기

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!menuName || !price || !imageFile) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newMenuItem: ManualMenuItem = {
      id: 0, // '직접입력임을 알리기 위함'
      name: menuName,
      img: imageFile, // 이미지 파일을 URL로 변환
      price: Number(price),
      discountRate: Number(discountRate),
    };

    // 팩 추가
    addPack([newMenuItem]);
    navigate("/admin/pack-create"); // 팩 생성 페이지로 이동
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="직접 팩 구성하기" showBackButton />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">팩 직접 입력</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 팩 이름 */}
          <div>
            <label
              htmlFor="menuName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              팩 이름
            </label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1562fc] focus:border-[#1562fc]"
            />
          </div>

          {/* 이미지 업로드 (파일 입력 + 카메라 + 갤러리 선택 가능) */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이미지 업로드
            </label>
            <input
              type="file"
              id="imageUrl"
              accept="image/*" // 이미지 파일만 선택 가능
              // capture="environment" // 모바일에서 카메라 선택 가능
              onChange={handleImageUpload}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1562fc] focus:border-[#1562fc]"
            />
          </div>

          {/* 가격 */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              가격 (원)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1562fc] focus:border-[#1562fc]"
            />
          </div>

          {/* 할인율 */}
          <div>
            <label
              htmlFor="discountRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              할인율 (%)
            </label>
            <input
              type="number"
              id="discountRate"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              required
              min="40"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1562fc] focus:border-[#1562fc]"
            />
          </div>

          {/* 완료 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
            >
              팩 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualEntry;
