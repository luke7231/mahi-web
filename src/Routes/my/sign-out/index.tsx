import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/auth";
import { gql, useMutation } from "@apollo/client";

const KAKAO_DELETE_USER = gql`
  mutation KakaoDeleteUser {
    kakaoDeleteUser {
      ok
      error
    }
  }
`;
const APPLE_DELETE_USER = gql`
  mutation AppleDeleteUser($code: String!) {
    appleDeleteUser(code: $code) {
      ok
      error
    }
  }
`;
const PURE_DELETE_USER = gql`
  mutation PureDeleteUser {
    pureDeleteUser {
      ok
      error
    }
  }
`;
const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [kakaoDeleteUser, { error }] = useMutation(KAKAO_DELETE_USER);
  const [appleDeleteUser, { error: appleError }] =
    useMutation(APPLE_DELETE_USER);
  const [pureDeleteUser] = useMutation(PURE_DELETE_USER);

  async function onClickDelete() {
    const isKakao = localStorage.getItem("isKakao");
    const isApple = localStorage.getItem("isApple");
    console.log(isApple);
    if (isKakao) {
      kakaoDeleteUser({
        onCompleted: (data) => {
          if (data.kakaoDeleteUser.ok) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("isKakao");
            logout();
            navigate("/");
          }
        },
      });
    } else if (isApple) {
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
        if (res) {
          const code = res.authorization.code;
          appleDeleteUser({
            variables: {
              code,
            },
            onCompleted: (data) => {
              if (data.appleDeleteUser.ok) {
                localStorage.removeItem("jwt");
                logout();
                navigate("/");
              }
            },
          });
        }
      } catch (e) {
        console.log(error);
      }
    } else {
      pureDeleteUser({
        onCompleted: (data) => {
          if (data.pureDeleteUser.ok) {
            localStorage.removeItem("jwt");
            logout();
            navigate("/");
          }
        },
      });
    }
  }
  return (
    <div
      className="text-red-500 hover:underline"
      onClick={() => onClickDelete()}
    >
      진짜 탈퇴?
    </div>
  );
};

export default SignOut;
