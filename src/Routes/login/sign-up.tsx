import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";

const PURE_SIGNUP = gql`
  mutation PureSignup($email: String!, $password: String!) {
    pureSignup(email: $email, password: $password) {
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

const SignUp: React.FC = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pureSignup] = useMutation(PURE_SIGNUP, {
    onCompleted: (data) => {
      setIsSubmitting(false);
      const jwt = data.pureSignup.token;
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

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 여기서 회원가입 로직을 처리하세요.
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    pureSignup({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          회원가입
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="이메일을 입력하세요."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="비밀번호를 입력하세요."
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="passwordCheck"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordCheck"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="동일하게 입력해주세요."
            />
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
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 underline"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
