import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../../components/common/back-arrow";
import { useAuth } from "../../../core/auth";

// GraphQL Mutation for Seller Login
const SELLER_LOGIN = gql`
  mutation SellerLogin(
    $contactNumber: String!
    $password: String!
    $push_token: String
  ) {
    sellerLogin(
      contactNumber: $contactNumber
      password: $password
      push_token: $push_token
    ) {
      token
      error
    }
  }
`;

const SellerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { changeLastPage } = useAuth();
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(SELLER_LOGIN);

  const push_token = localStorage.getItem("expo_push_token") as string | null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({ variables: { contactNumber, password, push_token } })
      .then((response) => {
        const { token, error } = response.data.sellerLogin;

        if (error) {
          alert(`로그인 실패: ${error}`);
        } else {
          // 토큰을 저장 (예: localStorage 또는 쿠키에 저장)
          localStorage.setItem("sellerToken", token);
          changeLastPage();
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
            <BackArrow />
          </div>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-black mb-2">
              사장님 로그인
            </h1>
            <p className="text-xl text-[#757575]">계정에 로그인하세요</p>
          </div>

          {/* Contact Number and Password Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xl font-medium text-black mb-1">
                연락처
              </label>
              <input
                type="text"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-xl focus:outline-none focus:border-[#1562fc]"
                placeholder="연락처를 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-black mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md text-xl focus:outline-none focus:border-[#1562fc]"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#1562fc]  text-white text-xl font-semibold rounded-md hover:bg-[#124ab7] transition duration-150"
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div
              onClick={() => navigate("/login")}
              className="text-xl underline text-[#757575] hover:text-[#1562fc]"
            >
              그냥 둘러볼게요~!
            </div>
          </div>
          {/* Error Display */}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}

          {/* Divider */}
          {/* <div className="my-4 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-xs text-gray-400">또는</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SellerLoginPage;
