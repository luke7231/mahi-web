import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Store = {
  name: string;
  address: string;
  contactNumber: string;
  openingHours: string;
  closingHours: string;
};

const StoreManagement: React.FC = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddStore = () => {
    setIsEditing(true);
  };

  const handleSaveStore = (storeInfo: Store) => {
    setStore(storeInfo);
    setIsEditing(false);
  };

  if (!store && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg mb-6 text-gray-700">
          매장이 아직 등록되지 않았습니다.
        </p>
        <button
          onClick={handleAddStore}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          매장 추가하기
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isEditing ? (
        <StoreEditForm
          onSave={handleSaveStore}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">매장 정보</h1>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">
              이름: <span className="text-black">{store?.name}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">
              주소: <span className="text-black">{store?.address}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">
              연락처: <span className="text-black">{store?.contactNumber}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-gray-600">
              영업 시간:{" "}
              <span className="text-black">
                {store?.openingHours} ~ {store?.closingHours}
              </span>
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            매장 정보 수정
          </button>

          {/* 매장 위치 설정 버튼 추가 */}
          <button
            onClick={() => navigate("/admin/store-location")} // StoreLocation 페이지로 이동
            className="w-full mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
          >
            매장 위치 설정
          </button>
        </div>
      )}
    </div>
  );
};

// 매장 수정 폼 컴포넌트
type StoreEditFormProps = {
  onSave: (storeInfo: Store) => void;
  onCancel: () => void;
};

const StoreEditForm: React.FC<StoreEditFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");

  const handleSubmit = () => {
    onSave({ name, address, contactNumber, openingHours, closingHours });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">매장 정보 수정</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">매장 이름</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">매장 주소</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">연락처</label>
        <input
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          영업 시작 시간
        </label>
        <input
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          영업 종료 시간
        </label>
        <input
          value={closingHours}
          onChange={(e) => setClosingHours(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default StoreManagement;
