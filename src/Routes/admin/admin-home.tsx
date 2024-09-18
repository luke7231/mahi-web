import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f5f7] p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">사장님 홈</h2>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {/* Buttons for each section */}
        <button
          onClick={() => navigate("/admin/sales")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          판매현황
        </button>
        <button
          onClick={() => navigate("/admin/pack-create")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          팩 만들기
        </button>
        <button
          onClick={() => navigate("/admin/menu-management")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          메뉴관리
        </button>
        <button
          onClick={() => navigate("/admin/store-management")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          매장관리
        </button>
        <button
          onClick={() => navigate("/admin/profile")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          내정보
        </button>
        <button
          onClick={() => navigate("/admin/support")}
          className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
        >
          고객센터
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
