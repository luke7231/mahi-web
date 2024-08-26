import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../core/auth";
import PIG from "./pig.png";
import co2 from "./co2.png";
import Partition from "../../components/common/partition";
import Menu from "../../components/my/menu";

const My = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  function onClickLogout() {
    localStorage.removeItem("jwt");
    logout();
    navigate("/");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-center py-4 text-lg font-semibold">
        마이페이지
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />

      <div className="w-full max-w-md p-4 bg-white mb-2">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-black text-lg font-semibold">
            마감원정대0456님의
            <br />
            이용 내역
          </div>
          <div className="text-[#757575] text-xs font-normal">자세히 보기</div>
        </div>

        {/* Card Section */}
        <div className="flex space-x-4">
          {/* Savings Card */}
          <div className="w-1/2 bg-[#ffede6] rounded-md p-4 flex flex-col items-center">
            <div className="text-black text-lg font-bold mb-1">13,000원</div>
            <div className="text-black text-lg font-normal mb-4">아꼈어요!</div>
            <img className="w-20 h-20" src={PIG} alt="Piggy Bank" />
          </div>

          {/* CO2 Reduction Card */}
          <div className="w-1/2 bg-[#dbf7ff] rounded-md p-4 flex flex-col items-center">
            <div className="text-black text-lg font-bold mb-1">1.5kg</div>
            <div className="text-black text-lg font-normal mb-4">줄였어요!</div>
            <img className="w-24 h-24" src={co2} alt="CO2 Reduction" />
          </div>
        </div>
      </div>
      <Partition color="light" height="thick" />

      {/* 메뉴   */}
      <Menu title="이용 내역" to="/order" />
      <Menu title="문의하기" to="/customer-service" />
      <Menu title="약관 및 정책" to="/policy" />
      <Menu title="로그아웃" onClick={() => onClickLogout()} />
      <Menu title="계정탈퇴" to={"/sign-out"} />

      <BottomTab />
    </div>
    // <div>
    //   <div className="p-4">
    //     <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
    //     <ul className="space-y-2">
    //       <li>
    //         <Link
    //           to="/purchase-history"
    //           className="text-blue-500 hover:underline"
    //         >
    //           이용 내역
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/customer-service"
    //           className="text-blue-500 hover:underline"
    //         >
    //           문의하기
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/policy" className="text-blue-500 hover:underline">
    //           약관 및 정책
    //         </Link>
    //       </li>
    //       <li>
    //         <div
    //           className="text-blue-500 hover:underline"
    //           onClick={() => onClickLogout()}
    //         >
    //           로그아웃
    //         </div>
    //       </li>
    //       <li>
    //         <Link to={"/sign-out"} className="text-red-500 hover:underline">
    //           계정 탈퇴
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>

    // </div>
  );
};

export default My;
