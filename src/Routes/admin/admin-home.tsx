import {
  FaUserFriends,
  FaMoneyBillWave,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FoodImg from "./food.png";
import { gql, useQuery } from "@apollo/client";

const GET_SELLER_REPORT = gql`
  query GetSellerReport {
    getSellerReport {
      totalCustomerCount
      totalDiscountPrice
      totalLikeCount
      totalCarbonEmission
    }
  }
`;

const AdminHome = () => {
  const navigate = useNavigate();
  const { data: sellerReportData } = useQuery(GET_SELLER_REPORT);
  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6 flex flex-col items-center">
      {/* Title Section */}
      <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
        <span className="bg-gradient-to-r from-[#1562fc] to-[#00c6ff] bg-clip-text text-transparent">
          마감히어로
        </span>
        <div className="bg-gradient-to-r from-[#1562fc] to-[#00c6ff] bg-clip-text text-xl text-transparent">
          사장님 홈
        </div>
      </h2>
      {/* Report */}
      {sellerReportData?.getSellerReport ? (
        <button
          onClick={() => navigate("/admin/report")}
          className="mt-6 bg-white text-[#444] rounded-lg shadow-md hover:bg-blue-50 flex items-center py-2 px-4 mb-4 gap-3"
        >
          <div>
            <FaUserFriends className="text-blue-500 w-4 h-4 inline mb-0.5 mr-1" />
            <span className="font-semibold text-md">
              {sellerReportData?.getSellerReport?.totalCustomerCount}
            </span>
          </div>
          <div>
            <FaMoneyBillWave className="text-green-600 w-4 h-4 inline mb-0.5 mr-1" />
            <span className="font-semibold text-md">
              {sellerReportData?.getSellerReport?.totalDiscountPrice.toLocaleString()}
            </span>
          </div>
          <div>
            <FaHeart className="text-red-500 w-4 h-4 inline mb-0.5 mr-1" />
            <span className="font-semibold text-md">
              {sellerReportData?.getSellerReport?.totalLikeCount}
            </span>
          </div>
          <div>
            <FaLeaf className="text-green-500 w-4 h-4 inline mb-0.5 mr-1" />
            <span className="font-semibold text-md">
              {sellerReportData?.getSellerReport?.totalCarbonEmission}
            </span>
          </div>
        </button>
      ) : null}

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
          <span className="text-lg text-[#1562fc] font-semibold">판매현황</span>
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
          <span className="text-lg text-[#1562fc] font-semibold">
            팩 만들기
          </span>
        </button>

        {/* 메뉴관리 */}
        <button
          onClick={() => navigate("/admin/menu-management")}
          className="bg-white text-[#1562fc] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <img src={FoodImg} className="w-[28px] h-[28px]" />
          <span className="text-lg font-semibold">메뉴관리</span>
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
          <span className="text-lg text-[#1562fc] font-semibold">매장관리</span>
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
          <span className="text-lg text-[#1562fc] font-semibold">내정보</span>
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
          <span className="text-lg text-[#1562fc] font-semibold">고객센터</span>
        </button>

        {/* 정산정보 */}
        <button
          onClick={() => navigate("/admin/settlement")}
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
            {/* 카드 바깥 테두리 */}
            <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
            {/* 카드 상단 가로 줄 */}
            <line x1="3" y1="10" x2="21" y2="10"></line>
            {/* 카드 하단 세부 가로 줄 */}
            <line x1="7" y1="15" x2="10" y2="15"></line>
            <line x1="14" y1="15" x2="17" y2="15"></line>
          </svg>
          <span className="text-lg text-[#1562fc] font-semibold">
            정산정보 입력
          </span>
        </button>

        {/* <button
          onClick={() => navigate("/admin/report")}
          className="bg-white text-[#444] py-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
        >
          <div className="flex gap-0.5 mb-0.5">
            <FaUserFriends className="text-blue-500 w-4 h-4 inline" />
            <FaMoneyBillWave className="text-green-500 w-4 h-4 inline" />
            <FaLeaf className="text-green-600 w-4 h-4 inline" />
            <FaHeart className="text-red-500 w-4 h-4 inline" />
          </div>
          <div className="text-lg text-[#1562fc] font-semibold">
            우리 매장은?
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default AdminHome;
