import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useAuth } from "../../core/auth";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../components/common/back-arrow";
import { isIOSApp, isWeb } from "../../Lib/user-agent-utils";
import FadeInWrapper from "../../components/fade-in-wrapper";

const WEB_URL = process.env.REACT_APP_URL;

const PURE_LOGIN = gql`
  mutation PureLogin($email: String!, $password: String!) {
    pureLogin(email: $email, password: $password) {
      user {
        id
        email
        phone
        createdAt
        updatedAt
      }
      token
    }
  }
`;
const APPLE_LOGIN = gql`
  query User($name: String, $idToken: String!, $push_token: String) {
    appleLogin(name: $name, id_token: $idToken, push_token: $push_token) {
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
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appleLogin, { data, error }] = useLazyQuery(APPLE_LOGIN, {
    onCompleted: (data) => {
      const jwt = data.appleLogin.token;
      const user = data.appleLogin.user;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("isApple", "1");
        authLogin();

        // 핸드폰 번호가 없다면 인증을 받습니다.
        if (!user?.phone) {
          navigate("/phone-number-auth");
          return;
        }

        const redirect = localStorage.getItem("redirect");

        if (redirect) {
          localStorage.removeItem("redirect");
          navigate(redirect);
        } else {
          navigate("/"); // 리디렉션 경로가 없으면 기본 경로로 이동
        }
      }
    },
    onError: (e) => alert(e),
  });
  const [pureLogin, { data: pureLoginData, error: pureLoginError }] =
    useMutation(PURE_LOGIN, {
      onCompleted: (data) => {
        setIsSubmitting(false);
        const jwt = data.pureLogin.token;
        const user = data.pureLogin.user;
        if (jwt) {
          localStorage.setItem("jwt", jwt);
          authLogin();
        }

        // 핸드폰 번호가 없다면 인증을 받습니다.
        if (!user?.phone) {
          navigate("/phone-number-auth");
          return;
        }

        const redirect = localStorage.getItem("redirect");

        if (redirect) {
          localStorage.removeItem("redirect");
          navigate(redirect);
        } else {
          navigate("/"); // 리디렉션 경로가 없으면 기본 경로로 이동
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
      scope: "account_email, profile_nickname",
    });
  };
  const loginWithApple = async (e: any) => {
    e.preventDefault();

    console.log("sign in with apple");

    window.AppleID.auth.init({
      clientId: "com.luke7299.mahi-sign-in",
      scope: "name email",
      redirectURI: `${process.env.REACT_APP_URL}/apple-auth`,
      state: "hey",
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      console.log(res);
      const id_token = res.authorization.id_token;
      const name = `${res?.user?.name.lastName}${res?.user?.name.firstName}`;

      const push_token = localStorage.getItem("expo_push_token") as
        | string
        | null;
      // mutation 호출
      await appleLogin({
        variables: {
          idToken: id_token,
          push_token,
          name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#fff] p-4">
        <FadeInWrapper className="w-full bg-white rounded-lg p-2">
          <div className="mb-4" onClick={() => navigate(-1)}>
            <BackArrow />
          </div>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-black mb-2">로그인</h1>
            <p className="text-sm text-[#757575]">계정에 로그인하세요</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Sign Up Button */}

            <button
              onClick={handleKakaoButtonClick}
              className="w-full py-4 border border-[#fae300] bg-[#fae300] text-black text-lg font-semibold rounded-xl flex items-center justify-center hover:bg-[#e8d800] transition duration-150"
            >
              <svg
                width="20px"
                height="18px"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  fill="#000000"
                  d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
                ></path>
              </svg>
              카카오로 계속하기
            </button>

            {isIOSApp() || isWeb() ? (
              <button
                onClick={loginWithApple}
                className="w-full py-3.5 bg-black text-white text-lg font-semibold rounded-xl flex items-center justify-center hover:bg-gray-800 transition duration-150"
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28px"
                  height="32px"
                  viewBox="0 0 348.000000 348.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="pb-0.5"
                >
                  <g
                    transform="translate(0.000000,348.000000) scale(0.100000,-0.100000)"
                    fill="#FFFFFF"
                    stroke="none"
                  >
                    <path
                      d="M2105 2816 c-193 -47 -351 -227 -363 -412 l-5 -77 61 5 c188 18 372
233 372 438 0 33 -3 60 -7 59 -5 0 -30 -6 -58 -13z"
                    />
                    <path
                      d="M1323 2289 c-177 -30 -338 -164 -409 -339 -122 -303 -32 -749 221
-1087 158 -213 248 -247 445 -167 89 36 101 38 200 38 98 0 111 -2 197 -37
165 -66 266 -47 377 73 73 79 156 207 210 321 66 140 66 130 -3 173 -110 67
-186 173 -216 298 -41 174 10 334 147 464 l70 66 -30 36 c-38 48 -134 114
-209 143 -49 20 -76 23 -178 23 -117 1 -122 0 -230 -42 -157 -61 -159 -61
-305 -9 -136 48 -207 60 -287 46z"
                    />
                  </g>
                </svg>
                Apple로 계속하기
              </button>
            ) : null}
            <div className="mt-4 text-center">
              <button
                className="w-full py-4 border bg-[#1692fc] border-[#1692fc] text-white font-bold text-lg rounded-xl"
                onClick={() => setShowEmailLogin(true)}
              >
                이메일로 로그인
              </button>
            </div>
          </div>

          {/* Email and Password Fields */}
          {showEmailLogin && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              >
                로그인
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-xs text-gray-400">또는</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <div
              onClick={() => navigate("/sign-up")}
              className="text-sm underline text-[#757575] hover:text-[#1562fc]"
            >
              이메일로 가입하기
            </div>
          </div>
          <div className="mt-4 text-center">
            <div
              onClick={() => navigate("/password-reset")}
              className="text-sm underline text-[#757575] hover:text-[#1562fc]"
            >
              비밀번호를 잊으셨나요?
            </div>
          </div>
          <div className="mt-4 text-center">
            <div
              onClick={() => navigate("/admin/login")}
              className="text-sm underline text-[#757575] hover:text-[#1562fc]"
            >
              사장님이세요?
            </div>
          </div>
        </FadeInWrapper>
      </div>
    </>
  );
};

export default Login;
