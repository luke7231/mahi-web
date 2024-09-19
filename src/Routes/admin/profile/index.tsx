import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GraphQL Query
const GET_SELLER = gql`
  query GetSeller($id: Int!) {
    seller(id: $id) {
      name
      email
      contactNumber
      address
    }
  }
`;

type SellerInfo = {
  name: string;
  email: string;
  contactNumber?: string;
  address?: string;
};

const SellerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState<SellerInfo>({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Replace 1 with actual seller id or dynamic value
  const { loading, error, data } = useQuery(GET_SELLER, {
    variables: { id: 1 },
  });

  // Once data is fetched, update seller state
  useEffect(() => {
    if (data && data.seller) {
      setSeller(data.seller);
    }
  }, [data]);

  const handleSave = () => {
    // Save logic (could be another mutation to update the seller info)
    console.log("Saving seller data:", seller);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePasswordChange = () => {
    navigate("/admin/change-password");
  };

  if (loading) return <p>로딩중입니다...</p>;
  if (error) return <p>서버에러: {error.message}</p>;

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
                value={seller.name}
                onChange={(e) => setSeller({ ...seller, name: e.target.value })}
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
                value={seller.email}
                onChange={(e) =>
                  setSeller({ ...seller, email: e.target.value })
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
                value={seller.contactNumber || ""}
                onChange={(e) =>
                  setSeller({ ...seller, contactNumber: e.target.value })
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
                value={seller.address || ""}
                onChange={(e) =>
                  setSeller({ ...seller, address: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 변경 */}
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
              <p className="text-lg">{seller.name}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <p className="text-lg">{seller.email}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                연락처
              </label>
              <p className="text-lg">{seller.contactNumber || "비공개"}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                주소
              </label>
              <p className="text-lg">{seller.address || "비공개"}</p>
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

export default SellerProfilePage;
