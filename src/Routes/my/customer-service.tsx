import React from "react";
import Menu from "../../components/my/menu";
import BottomTab from "../../components/bottom-tab";
import IMG from "./customer-service.png";
import Header from "../../components/common/header";

const CustomerService = () => {
  const copyToClipboard = (text: string) => {
    navigator?.clipboard?.writeText(text).then(
      () => {
        alert("전화번호가 복사되었습니다!");
      },
      (err) => {
        alert("복사 실패");
      }
    );
  };
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <Header title="문의하기" showBackButton />

      {/* 본문 내용 */}
      <div className="flex-1 flex flex-col items-center p-4 h-full justify-center bg-[#F6F6F6]">
        <div className="flex flex-col items-center max-w-xs w-full">
          {/* <a href="http://pf.kakao.com/_xawxcRn/chat">상담직원에게 문의하기</a> */}
          <a
            href="http://pf.kakao.com/_xawxcRn/chat"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            상담직원에게 문의하기
          </a>
          <div className="mt-2 text-center text-[#1562fc] text-xs font-normal font-['Pretendard'] leading-none">
            24시간 문의 가능
          </div>
        </div>
        <img
          className="w-[17rem] h-auto mt-4 mix-blend-color-burn"
          src={IMG}
          alt="Customer Service"
        />
      </div>

      {/* 하단 탭 */}
      <BottomTab />
    </div>
  );
};

export default CustomerService;
