import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../core/auth";

const DELETE_USER = gql`
  mutation KakaoDeleteUser {
    kakaoDeleteUser {
      ok
      error
    }
  }
`;
const My = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  function onClickDelete() {
    deleteUser({
      onCompleted: (data) => {
        if (data.kakaoDeleteUser.ok) {
          localStorage.removeItem("jwt");
          logout();
          navigate("/");
        }
      },
    });
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
