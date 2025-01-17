import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";
import { identify, Identify } from "@amplitude/analytics-browser";

const PURE_SIGNUP = gql`
  mutation PureSignup(
    $email: String!
    $password: String!
    $push_token: String
  ) {
    pureSignup(email: $email, password: $password, push_token: $push_token) {
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
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [pureSignup] = useMutation(PURE_SIGNUP, {
    onCompleted: (data) => {
      setIsSubmitting(false);
      const jwt = data.pureSignup.token;
      if (jwt) {
        const updateUserPropertiesAfterSignup = () => {
          const identifyUser = new Identify().set("isRegisteredUser", true);
          identify(identifyUser);
        };
        updateUserPropertiesAfterSignup();
        localStorage.setItem("jwt", jwt);
        authLogin();
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

    // Check if passwords match
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      setIsSubmitting(false);
      return;
    }

    // Check if both checkboxes are checked
    if (!privacyPolicyChecked || !termsChecked) {
      alert("개인정보 처리방침과 서비스 이용약관에 모두 동의해 주세요.");
      setIsSubmitting(false);
      return;
    }

    const push_token = localStorage.getItem("expo_push_token") as string | null;

    pureSignup({
      variables: {
        email,
        password,
        push_token,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f5f7] p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          회원가입
        </h2>

        {/* Sign-Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="이메일을 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="비밀번호를 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="passwordCheck"
              className="block text-sm font-medium text-black mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordCheck"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="동일하게 입력해주세요."
            />
          </div>

          {/* Checkboxes for Terms and Privacy Policy */}
          <div className="space-y-2 ml-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={privacyPolicyChecked}
                onChange={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
                className="mr-2"
                required
              />
              <label htmlFor="privacyPolicy" className="text-sm text-black">
                개인정보 처리방침 동의(필수){" "}
                <a
                  href="https://quirky-moss-44e.notion.site/4fae5a1a1faa4f6fb569e5ec4f07e9c5?pvs=4"
                  className="underline"
                >
                  링크
                </a>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-black">
                서비스 이용약관 동의(필수){" "}
                <a
                  href="https://quirky-moss-44e.notion.site/fffd3b7673888070be17ea9672b3d4dc?pvs=4"
                  className="underline"
                >
                  링크
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-semibold ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1562fc] hover:bg-[#124ab7] transition duration-150"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-[#1562fc] underline hover:text-[#124ab7] transition"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
