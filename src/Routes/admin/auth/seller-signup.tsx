import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation for creating a seller
const CREATE_SELLER = gql`
  mutation CreateSeller($contactNumber: String!, $password: String!) {
    createSeller(contactNumber: $contactNumber, password: $password) {
      seller {
        id
        contactNumber
      }
      token
    }
  }
`;

const SellerSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createSeller, { loading, error }] = useMutation(CREATE_SELLER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    createSeller({
      variables: { contactNumber, password },
    })
      .then((response) => {
        const { token } = response.data.createSeller;

        // 토큰을 localStorage에 저장
        localStorage.setItem("sellerToken", token);

        alert("회원가입이 완료되었습니다.");
        navigate("/admin/home"); // 회원가입 성공 시 홈으로 이동
      })
      .catch((err) => {
        console.error("Error during sign-up:", err);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-black mb-2">회원가입</h1>
          <p className="text-sm text-[#757575]">새 계정을 생성하세요</p>
        </div>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              연락처 (ID로 사용됩니다.)
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="연락처를 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#1562fc] text-white text-sm font-semibold rounded-md hover:bg-[#124ab7] transition duration-150"
            disabled={loading}
          >
            회원가입
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">에러: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SellerSignUpPage;
