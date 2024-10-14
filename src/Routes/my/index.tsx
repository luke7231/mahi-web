import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../../core/auth";
import PIG from "./pig.png";
import co2 from "./co2.png";
import Partition from "../../components/common/partition";
import Menu from "../../components/my/menu";
import { GET_ORDERS } from "../order";
import Modal from "../../components/common/modal";
import Header from "../../components/common/header";

const My = () => {
  // const [isOpenModal, setIsOpenModal] = useState(true);
  const { data, loading } = useQuery(GET_ORDERS);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // const toggleModal = () => {
  //   setIsOpenModal(!isOpenModal);
  // };
  useEffect(() => {
    if (data?.orders) {
      const orders = data.orders;
      const getTotalDisount = () => {
        return orders.reduce((total, item) => {
          return total + item?.totalDiscount;
        }, 0);
      };
      const total = getTotalDisount();
      setTotalDiscount(total);
    }
    if (data?.orders) {
      const orders = data.orders;
      const getTotalAmount = () => {
        return orders.reduce((total, item) => {
          return total + item?.amount;
        }, 0);
      };
      const total = getTotalAmount();
      setTotalAmount(total);
    }
  }, [data?.orders]);
  function onClickLogout() {
    localStorage.removeItem("jwt");
    logout();
    navigate("/");
  }
  function calculateCarbonEmission(amount: number) {
    // 입력된 금액을 1,000원 단위로 올림
    const roundedAmount = Math.ceil(amount / 1000) * 1000;

    // 1,000원당 0.25kg을 곱해서 탄소 배출량 계산
    const carbonEmission = (roundedAmount / 1000) * 0.25;

    return carbonEmission;
  }
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <Header title="마이페이지" />

      <div
        className="w-full p-4 bg-white mb-2"
        onClick={() => navigate("/order")}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-black text-lg font-semibold">나의 이용 내역</div>
          <div className="text-[#757575] text-xs font-normal">자세히 보기</div>
        </div>

        {/* Card Section */}
        <div className="flex space-x-4">
          {/* Savings Card */}
          <div className="w-1/2 bg-[#ffede6] rounded-md p-4 flex flex-col items-center">
            <div className="text-black text-lg font-bold mb-1">
              {totalDiscount.toLocaleString() + "원"}
            </div>
            <div className="text-black text-lg font-normal mb-4">아꼈어요!</div>
            <img className="w-20 h-20" src={PIG} alt="Piggy Bank" />
          </div>

          {/* CO2 Reduction Card */}
          <div className="w-1/2 bg-[#dbf7ff] rounded-md p-4 flex flex-col items-center">
            <div className="text-black text-lg font-bold mb-1">
              {calculateCarbonEmission(totalAmount)}kg
            </div>
            <div className="text-black text-lg font-normal mb-4">줄였어요!</div>
            <img className="w-24 h-24" src={co2} alt="CO2 Reduction" />
          </div>
        </div>
      </div>
      <Partition color="light" height="thick" />

      <div className="pb-24">
        {/* 메뉴   */}
        <Menu title="매장 추천하기" to="https://forms.gle/PXmEvzq4LsNDC1Gj9" />
        <Menu title="문의하기" to="/customer-service" />
        <Menu title="약관 및 정책" to="/policy" />
        <Menu title="비밀번호 재설정" to="/change-password" />
        <Menu title="사장님 로그인" to="/admin/login" />
        <Menu title="로그아웃" onClick={() => onClickLogout()} />
        <Menu title="계정탈퇴" to="/sign-out" />
        {/* <Modal isOpen={isOpenModal} onYes={} onClose={toggleModal} /> */}
      </div>

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
