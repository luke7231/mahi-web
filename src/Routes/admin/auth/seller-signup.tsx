import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation for creating a seller
const CREATE_SELLER = gql`
  mutation CreateSeller(
    $name: String!
    $email: String!
    $password: String!
    $contactNumber: String
    $address: String
  ) {
    createSeller(
      name: $name
      email: $email
      password: $password
      contactNumber: $contactNumber
      address: $address
    ) {
      seller {
        id
        name
        email
      }
      token
    }
  }
`;

const SellerSignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const [createSeller, { loading, error, data }] = useMutation(CREATE_SELLER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createSeller({
      variables: { name, email, password, contactNumber, address },
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
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="이메일을 입력하세요"
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
              연락처
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="연락처를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              주소
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
              placeholder="주소를 입력하세요"
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
