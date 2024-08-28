import React, { useEffect, useState } from "react";

import { gql } from "../../__generated__";
import { useLocation } from "../../core/location-provider";
import BottomTab from "../../components/bottom-tab";
import { useNavigate } from "react-router-dom";
import NoOrders from "../../components/order/no-orders";
import { useQuery } from "@apollo/client";
import Partition from "../../components/common/partition";

export const GET_ORDERS = gql(`
query Orders {
  orders {
    id
    createdAt
    amount
    isApproved
    products {
      store {
        title
      }
      img
    }
    totalDiscount
    totalQuantity
  }
}

`);
const Order = () => {
  const { data, loading } = useQuery(GET_ORDERS);
  const navigate = useNavigate();
  const { hasLastLo, getLocationFromStorage } = useLocation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
    const day = date.getDate(); // 일
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekDays[date.getDay()]; // 요일

    return `${month}/${day}(${dayOfWeek}) 픽업완료`;
  };

  function calculateCarbonEmission(amount: number) {
    // 입력된 금액을 1,000원 단위로 올림
    const roundedAmount = Math.ceil(amount / 1000) * 1000;

    // 1,000원당 0.25kg을 곱해서 탄소 배출량 계산
    const carbonEmission = (roundedAmount / 1000) * 0.25;

    return carbonEmission;
  }

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <div className="flex justify-center py-4 text-lg font-semibold">
        주문내역
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />
      {data?.orders?.length === 0 ? <NoOrders /> : null}
      <div>
        {loading ? <div>loading...</div> : null}

        {data?.orders?.map((order) => {
          return (
            <>
              <div className="w-full max-w-md p-4 bg-white ">
                <div className="mb-3 ml-1 text-sm text-[#757575]">
                  {/* 0/00(요일) 픽업완료 */}
                  {formatDate(order.createdAt)}
                </div>
                <div className="flex items-start">
                  {/* Image */}
                  <img
                    className="w-20 h-20 rounded-md object-cover"
                    src={order.products?.[0].img as string}
                    alt="Product"
                  />

                  {/* Main Content */}
                  <div className="ml-4 flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-black text-lg font-semibold">
                          {order.products?.[0]?.store.title}
                        </div>
                      </div>
                      {/* <div className="w-[54px] h-5 px-2 py-0.5 border border-[#dfdfdf] rounded-3xl flex items-center justify-center">
                      <div className="text-[#757575] text-[10px] font-medium">
                        주문상세
                      </div>
                    </div> */}
                    </div>

                    {/* Description */}
                    <div className="text-black text-sm mb-2">
                      {order.amount.toLocaleString()}원
                    </div>

                    {/* Discount and Environmental Info */}
                    <div className="flex space-x-2">
                      <div className="h-[23px] px-2 py-1 bg-[#f3f3f3] rounded-md flex items-center">
                        <div className="text-black text-[10px]">
                          {order.totalDiscount.toLocaleString()}원 할인받았어요
                        </div>
                      </div>
                      <div className="h-[23px] px-2 py-1 bg-[#edfbdf] rounded-md flex items-center">
                        <span className="text-black text-[10px]">CO</span>
                        <span className="text-black text-[10px] uppercase">
                          <sub>2</sub>
                        </span>
                        <span className="text-black text-[10px] ml-1">
                          {" "}
                          {calculateCarbonEmission(order.amount)}kg 줄였어요!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Partition color="light" height="thick" />
            </>
          );
        })}
      </div>
      <BottomTab />
    </div>
  );
};

export default Order;
