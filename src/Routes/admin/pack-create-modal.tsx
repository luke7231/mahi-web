import React from "react";
import { useNavigate } from "react-router-dom";

const PackCreateModal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-92">
        <h2 className="text-xl font-semibold text-center mb-4">팩 만들기</h2>

        <div className="flex justify-around items-center space-x-4">
          {/* 기존 메뉴에서 선택 */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer bg-gray-100 border border-[#1562fc] p-4 rounded-lg hover:bg-gray-200 transition w-36 h-36" // 고정된 width, height
            onClick={() => navigate("/admin/select-from-menu")}
          >
            {/* 기존 메뉴 선택 아이콘 (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mb-2 text-[#1562fc]"
            >
              <rect x="3" y="3" width="4" height="4"></rect>
              <rect x="10" y="3" width="4" height="4"></rect>
              <rect x="17" y="3" width="4" height="4"></rect>
              <rect x="3" y="10" width="4" height="4"></rect>
              <rect x="10" y="10" width="4" height="4"></rect>
              <rect x="17" y="10" width="4" height="4"></rect>
              <rect x="3" y="17" width="4" height="4"></rect>
              <rect x="10" y="17" width="4" height="4"></rect>
              <rect x="17" y="17" width="4" height="4"></rect>
            </svg>

            <span className="text-lg font-medium text-center">
              메뉴에서 선택
            </span>
          </div>

          {/* 직접 정보 입력 */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer bg-gray-100 border border-[#1562fc] p-4 rounded-lg hover:bg-gray-200 transition w-36 h-36" // 고정된 width, height
            onClick={() => navigate("/admin/manual-entry")}
          >
            {/* 직접 정보 입력 아이콘 (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mb-2 text-[#1562fc]"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span className="text-lg font-medium text-center">직접 입력</span>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)} // 모달 닫기
            className="px-4 py-2 bg-gray-200 rounded-md text-black hover:bg-gray-300 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackCreateModal;
