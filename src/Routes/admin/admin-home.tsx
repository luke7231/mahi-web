import React from "react";
import { useNavigate } from "react-router-dom";
import FoodImg from "./food.png";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6 flex flex-col items-center">
      {/* Title Section */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        <span className="bg-gradient-to-r from-[#1562fc] to-[#00c6ff] bg-clip-text text-transparent">
          마감히어로
        </span>
        <div className="bg-gradient-to-r from-[#1562fc] to-[#00c6ff] bg-clip-text text-xl text-transparent">
          사장님 홈
        </div>
      </h2>

      {/* Button Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {/* 판매현황 */}
        <button
          onClick={() => navigate("/admin/sales")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3h18v18H3z"></path>
            <path d="M16 8v8"></path>
            <path d="M8 16v-6"></path>
            <path d="M12 16v-4"></path>
          </svg>
          <span className="text-sm text-[#1562fc] font-semibold">판매현황</span>
        </button>

        {/* 팩 만들기 */}
        <button
          onClick={() => navigate("/admin/pack-create")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M6 2L4 6v14a2 2 0 002 2h12a2 2 0 002-2V6l-2-4H6z"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M16 10a4 4 0 01-8 0"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
          <span className="text-sm text-[#1562fc] font-semibold">
            팩 만들기
          </span>
        </button>

        {/* 메뉴관리 */}
        <button
          onClick={() => navigate("/admin/menu-management")}
          className="bg-white text-[#1562fc] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <img src={FoodImg} className="w-[28px] h-[28px]" />
          <span className="text-sm font-semibold">메뉴관리</span>
        </button>

        {/* 매장관리 */}
        <button
          onClick={() => navigate("/admin/store-management")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M3 12L12 3l9 9M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 21V9h6v12"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-[#1562fc] font-semibold">매장관리</span>
        </button>

        {/* 내정보 */}
        <button
          onClick={() => navigate("/admin/profile")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M6 18v-1a6 6 0 0112 0v1"></path>
          </svg>
          <span className="text-sm text-[#1562fc] font-semibold">내정보</span>
        </button>

        {/* 고객센터 */}
        <button
          onClick={() => navigate("/admin/support")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9 12h6"></path>
          </svg>
          <span className="text-sm text-[#1562fc] font-semibold">고객센터</span>
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
