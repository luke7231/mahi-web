import React, { useState } from "react";

const WEB_URL = process.env.REACT_APP_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kakao = window.Kakao;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // 여기에 로그인 처리 로직을 추가합니다.
    console.log("Logging in with:", { email, password });

    // 예시로 로그인 후 상태 초기화
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };
  const handleKakaoButtonClick = () => {
    // 카카오 간편 로그인
    kakao.Auth.authorize({
      redirectUri: `${WEB_URL}/auth`,
      scope: "account_email",
    });
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
            // onClick={handleKakaoButtonClick}
          >
            Apple Id로 계속하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
