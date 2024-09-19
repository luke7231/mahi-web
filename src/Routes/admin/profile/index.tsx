import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type UserInfo = {
  name: string;
  email: string;
  password?: string;
  contactNumber?: string;
  address?: string;
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "홍길동",
    email: "owner@example.com",
    contactNumber: "010-1234-5678",
    address: "서울시 강남구 역삼동",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    // 백엔드로 데이터를 전송하거나 state 업데이트
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePasswordChange = () => {
    navigate("/admin/change-password"); // 비밀번호 변경 페이지로 이동
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">내 정보</h1>

        {isEditing ? (
          <>
            {/* 이름 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* 이메일 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* 연락처 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                연락처
              </label>
              <input
                type="text"
                value={userInfo.contactNumber || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, contactNumber: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* 주소 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <input
                type="text"
                value={userInfo.address || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 변경 */}
            {/* 비밀번호 변경 버튼 */}
            <button
              onClick={handlePasswordChange}
              className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition mt-4"
            >
              비밀번호 변경하기
            </button>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition"
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 정보 보기 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <p className="text-lg">{userInfo.name}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <p className="text-lg">{userInfo.email}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                연락처
              </label>
              <p className="text-lg">{userInfo.contactNumber || "비공개"}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <p className="text-lg">{userInfo.address || "비공개"}</p>
            </div>

            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
            >
              정보 수정하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
