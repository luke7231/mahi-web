import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useAuth } from "../../core/auth";
import { useNavigate } from "react-router-dom";

const WEB_URL = process.env.REACT_APP_URL;

const PURE_LOGIN = gql`
  mutation PureLogin($email: String!, $password: String!) {
    pureLogin(email: $email, password: $password) {
      user {
        id
        email
        createdAt
        updatedAt
      }
      token
    }
  }
`;
const APPLE_LOGIN = gql`
  query User($idToken: String!, $push_token: String) {
    appleLogin(id_token: $idToken, push_token: $push_token) {
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
`;

const Login: React.FC = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appleLogin, { data, error }] = useLazyQuery(APPLE_LOGIN, {
    onCompleted: (data) => {
      const jwt = data.appleLogin.token;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        authLogin();
        // TODO: 원래 있던 곳으로 보낸다.
        navigate("/");
      }
    },
    onError: (e) => alert(e),
  });
  const [pureLogin, { data: pureLoginData, error: pureLoginError }] =
    useMutation(PURE_LOGIN, {
      onCompleted: (data) => {
        setIsSubmitting(false);
        const jwt = data.pureLogin.token;
        if (jwt) {
          localStorage.setItem("jwt", jwt);
          authLogin();
          // TODO: 원래 있던 곳으로 보낸다.
          navigate("/");
        }
      },
      onError: (e) => {
        setIsSubmitting(false);
        alert(e);
      },
    });

  const kakao = window.Kakao;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    // mutation 호출
    pureLogin({
      variables: {
        email,
        password,
      },
    });
  };
  const handleKakaoButtonClick = () => {
    // 카카오 간편 로그인
    kakao.Auth.authorize({
      redirectUri: `${WEB_URL}/auth`,
      scope: "account_email",
    });
  };
  const loginWithApple = async (e: any) => {
    e.preventDefault();

    console.log("sign in with apple");

    window.AppleID.auth.init({
      clientId: "com.luke7299.mahi-sign-in",
      scope: "email",
      redirectURI: `${process.env.REACT_APP_URL}/apple-auth`,
      state: "hey",
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      console.log(res);
      const id_token = res.authorization.id_token;

      const push_token = localStorage.getItem("expo_push_token") as
        | string
        | null;
      // mutation 호출
      await appleLogin({
        variables: {
          idToken: id_token,
          push_token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="text-center mb-4">
            <button
              onClick={() => navigate("/sign-up")}
              className="text-sm text-blue-500 underline"
            >
              이메일로 회원가입
            </button>
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <button
            className={`mt-4 w-full py-3 rounded-lg text-white font-semibold bg-yellow-400`}
            onClick={handleKakaoButtonClick}
          >
            카카오로 계속하기
          </button>

          <button
            className={`mt-4 w-full py-3 rounded-lg text-white font-semibold bg-black`}
            onClick={loginWithApple}
          >
            Apple Id로 계속하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
