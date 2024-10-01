import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation for updating seller password
const UPDATE_SELLER_PASSWORD = gql`
  mutation UpdateSellerPassword($oldPassword: String!, $newPassword: String!) {
    updateSellerPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ok
      error
    }
  }
`;

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { loading, error, data }] = useMutation(
    UPDATE_SELLER_PASSWORD
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    updatePassword({
      variables: {
        oldPassword: currentPassword,
        newPassword: newPassword,
      },
    })
      .then((response) => {
        if (response.data.updateSellerPassword.ok) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          navigate("/admin/home"); // 비밀번호 변경 성공 시 홈으로 이동
        } else {
          alert(
            `비밀번호 변경 실패: ${response.data.updateSellerPassword.error}`
          );
        }
      })
      .catch((err) => {
        alert("비밀번호 변경 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          비밀번호 변경
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              현재 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="현재 비밀번호를 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="새 비밀번호를 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="새 비밀번호를 다시 입력하세요."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-150"
            disabled={loading}
          >
            {loading ? "비밀번호 변경 중..." : "비밀번호 변경"}
          </button>

          {error && <p className="text-red-500 mt-4">에러: {error.message}</p>}
          {data && !data.updateSellerPassword.ok && (
            <p className="text-red-500 mt-4">
              에러: {data.updateSellerPassword.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
