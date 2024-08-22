import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../core/auth";

const My = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  function onClickLogout() {
    localStorage.removeItem("jwt");
    logout();
    navigate("/");
  }
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
        <ul className="space-y-2">
          <li>
            <Link
              to="/purchase-history"
              className="text-blue-500 hover:underline"
            >
              이용 내역
            </Link>
          </li>
          <li>
            <Link
              to="/customer-service"
              className="text-blue-500 hover:underline"
            >
              문의하기
            </Link>
          </li>
          <li>
            <Link to="/policy" className="text-blue-500 hover:underline">
              약관 및 정책
            </Link>
          </li>
          <li>
            <div
              className="text-blue-500 hover:underline"
              onClick={() => onClickLogout()}
            >
              로그아웃
            </div>
          </li>
          <li>
            <Link to={"/sign-out"} className="text-red-500 hover:underline">
              계정 탈퇴
            </Link>
          </li>
        </ul>
      </div>
      <BottomTab />
    </div>
  );
};

export default My;
