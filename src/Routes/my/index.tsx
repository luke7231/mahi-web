import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../core/auth";

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
const My = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [kakaoDeleteUser, { error }] = useMutation(KAKAO_DELETE_USER);
  const [appleDeleteUser, { error: appleError }] =
    useMutation(APPLE_DELETE_USER);
  const [pureDeleteUser] = useMutation(PURE_DELETE_USER);
  function onClickLogout() {
    localStorage.removeItem("jwt");
    logout();
    navigate("/");
  }
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/purchase-history"
            className="text-blue-500 hover:underline"
          >
            Purchase History
          </Link>
        </li>
        <li>
          <Link
            to="/customer-service"
            className="text-blue-500 hover:underline"
          >
            Customer Service
          </Link>
        </li>
        <li>
          <Link to="/notice" className="text-blue-500 hover:underline">
            Notice
          </Link>
        </li>
        <li>
          <Link to="/profile-edit" className="text-blue-500 hover:underline">
            Profile Edit
          </Link>
        </li>
        <li>
          <div
            className="text-blue-500 hover:underline"
            onClick={() => onClickLogout()}
          >
            Logout
          </div>
        </li>
        <li>
          <div
            className="text-red-500 hover:underline"
            onClick={() => onClickDelete()}
          >
            Delete Account
          </div>
        </li>
      </ul>
      <BottomTab />
    </div>
  );
};

export default My;
