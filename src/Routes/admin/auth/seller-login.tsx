import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../components/common/back-arrow";

// GraphQL Mutation
const SELLER_LOGIN = gql`
  mutation SellerLogin($email: String!, $password: String!) {
    sellerLogin(email: $email, password: $password) {
      token
      error
    }
  }
`;

const SellerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(SELLER_LOGIN);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({ variables: { email, password } })
      .then((response) => {
        const { token, error } = response.data.sellerLogin;

        if (error) {
          alert(`로그인 실패: ${error}`);
        } else {
          // 토큰을 저장 (ex: localStorage 또는 쿠키에 저장)
          localStorage.setItem("sellerToken", token);

          // 로그인 성공 시 '/admin/home'으로 이동
          navigate("/admin/home");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#fff] p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div onClick={() => navigate(-1)}>
            {/* Back Arrow Placeholder */}
            <BackArrow />
          </div>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-black mb-2">로그인</h1>
            <p className="text-sm text-[#757575]">계정에 로그인하세요</p>
          </div>

          {/* Email and Password Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
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
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#1562fc]"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#1562fc] text-white text-sm font-semibold rounded-md hover:bg-[#124ab7] transition duration-150"
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* Error Display */}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-xs text-gray-400">또는</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign Up Button */}
          <div className="mt-4 text-center">
            <button
              className="w-full py-2 border border-[#1562fc] text-[#1562fc] text-sm font-semibold rounded-md hover:bg-[#e6f0ff] transition duration-150"
              onClick={() => navigate("/admin/sign-up")}
            >
              회원가입
            </button>
          </div>

          {/* Additional Links */}
          {/* <div className="mt-4 text-center">
            <div
              onClick={() => navigate("/password-reset")}
              className="text-xs text-[#757575] hover:text-[#1562fc]"
            >
              비밀번호를 잊으셨나요?
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SellerLoginPage;
