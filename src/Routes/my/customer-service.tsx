import React from "react";
import Menu from "../../components/my/menu";
import BottomTab from "../../components/bottom-tab";
import IMG from "./customer-service.png";

const CustomerService = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("전화번호가 복사되었습니다!");
      },
      (err) => {
        console.error("복사 실패: ", err);
      }
    );
  };
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-center py-4 text-lg font-semibold">
        문의하기
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />

      {/* 본문 내용 */}
      <div className="flex-1 flex flex-col items-center p-4 h-full justify-center bg-[#F6F6F6]">
        <div className="flex flex-col items-center max-w-xs w-full">
          <div className="text-center text-[#464646] text-lg font-semibold font-['Pretendard'] leading-[25.20px]">
            hiyeom7@naver.com
          </div>

          <div className="w-full flex flex-col items-center mt-2">
            <div className="flex ">
              <div
                onClick={() => copyToClipboard("010-8935-7774")}
                className="underline text-center text-[#464646] text-lg font-semibold font-['Pretendard'] leading-[25.20px]"
              >
                010-8935-7774
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66634 5.83333V12.5C6.66634 12.942 6.84194 13.366 7.1545 13.6785C7.46706 13.9911 7.89098 14.1667 8.33301 14.1667H13.333M6.66634 5.83333V4.16667C6.66634 3.72464 6.84194 3.30072 7.1545 2.98816C7.46706 2.67559 7.89098 2.5 8.33301 2.5H12.1547C12.3757 2.50005 12.5876 2.58788 12.7438 2.74417L16.4222 6.4225C16.5785 6.57874 16.6663 6.79067 16.6663 7.01167V12.5C16.6663 12.942 16.4907 13.366 16.1782 13.6785C15.8656 13.9911 15.4417 14.1667 14.9997 14.1667H13.333M6.66634 5.83333H4.99967C4.55765 5.83333 4.13372 6.00893 3.82116 6.32149C3.5086 6.63405 3.33301 7.05797 3.33301 7.5V15.8333C3.33301 16.2754 3.5086 16.6993 3.82116 17.0118C4.13372 17.3244 4.55765 17.5 4.99967 17.5H11.6663C12.1084 17.5 12.5323 17.3244 12.8449 17.0118C13.1574 16.6993 13.333 16.2754 13.333 15.8333V14.1667"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
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
