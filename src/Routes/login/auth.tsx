import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";

const KAKAO_LOGIN = gql(`
  query Login($code: String!, $client_id: String!, $redirect_url: String!, $push_token: String) {
    kakaoLogin(code: $code, client_id: $client_id, redirect_url: $redirect_url, push_token: $push_token) {
      user {
        id
        name
        email
        password
        phone
        dateOfBirth
        gender
        address
        createdAt
        updatedAt
        push_token
      }
      token
    }
  }
`);

const KakaoRedirectHandler = () => {
  const { login: authLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [kakaoLogin, { loading, error, data }] = useLazyQuery(KAKAO_LOGIN, {
    onCompleted: (data) => {
      const jwt = data.kakaoLogin.token;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("isKakao", "1");

        authLogin();
        // TODO: 원래 있던 곳으로 보낸다.
        const redirect = localStorage.getItem("redirect");

        if (redirect) {
          localStorage.removeItem("redirect");
          navigate(redirect);
        } else {
          navigate("/"); // 리디렉션 경로가 없으면 기본 경로로 이동
        }
      }
    },
  });

  useEffect(() => {
    const searchParams = new URL(document.location.toString()).searchParams;
    const code = searchParams.get("code");
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_url = `${process.env.REACT_APP_URL}/auth`;

    const push_token = localStorage.getItem("expo_push_token") as string | null;
    if (code && client_id && redirect_url) {
      kakaoLogin({
        variables: { code, client_id, redirect_url, push_token },
      });
    }
  }, [kakaoLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-gray-700">
              카카오 로그인을 진행 중입니다...
            </p>
          </div>
        ) : error ? (
          <>
            <p className="text-red-500">로그인 중 오류가 발생했습니다.</p>
            {error.message}
            <div className="mt-4 text-center">
              <div
                onClick={() => navigate("/login")}
                className="text-xs text-[#757575] underline hover:text-[#1562fc]"
              >
                로그인 페이지로 돌아가기
              </div>
            </div>
          </>
        ) : (
          <p className="text-lg font-semibold text-gray-700">
            로그인이 완료되었습니다. <br />
            잠시만 기다려 주세요...
          </p>
        )}
      </div>
    </div>
  );
};

export default KakaoRedirectHandler;
