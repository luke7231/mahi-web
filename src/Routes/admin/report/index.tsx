import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Header from "../../../components/common/header";
import { useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaMoneyBillWave,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";

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

const AdminReport: React.FC = () => {
  const storeId = 1; // 상관 없음.
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_SELLER_REPORT);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다. 😢</div>;

  const {
    totalCustomerCount,
    totalDiscountPrice,
    totalLikeCount,
    totalCarbonEmission,
  } = data.getSellerReport;

  return (
    <>
      <Header title="우리 매장은?" showBackButton />
      <div className="flex flex-col gap-6 w-full max-w-4xl bg-[#f4f5f7] p-6 rounded-lg shadow-lg h-[100vh]">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">우리 매장은 현재</h3>
        </div>

        {/* New Customers */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <FaUserFriends className="text-blue-500 w-10 h-10" />
          <span className="ml-4 text-lg font-semibold text-gray-800">
            이번 달에{" "}
            <strong className="text-blue-500">{totalCustomerCount}</strong>명의
            새로운 손님과 인연을 맺었어요!
          </span>
        </div>

        {/* Money Saved */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <FaMoneyBillWave className="text-green-600 w-10 h-10" />
          <span className="ml-4 text-lg font-semibold text-gray-800">
            <strong className="text-green-600">
              {totalDiscountPrice.toLocaleString()}
            </strong>
            원을 절약하고 수익을 더 챙기셨네요!
          </span>
        </div>

        {/* Total Likes */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <FaHeart className="text-red-500 w-10 h-10" />
          <span className="ml-4 text-lg font-semibold text-gray-800">
            현재 <strong className="text-red-500">{totalLikeCount}</strong>명이
            매장을 좋아요하며 응원하고 있어요!
          </span>
        </div>

        {/* Environment Saved */}
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <FaLeaf className="text-green-500 w-10 h-10" />
          <span className="ml-4 text-lg font-semibold text-gray-800">
            이번 달에{" "}
            <strong className="text-green-500">{totalCarbonEmission}</strong>
            kg의 쓰레기를 줄이고 환경을 지켰어요!
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminReport;
