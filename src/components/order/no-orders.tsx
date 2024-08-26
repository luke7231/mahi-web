import React from "react";
import NoOrdersImg from "./no-order.png";

export const NoOrders = (): JSX.Element => {
  return (
    <div className="w-full h-full flex justify-center bg-[#f6f6f6]">
      <div className="relative w-full max-w-sm p-4 text-center bg-[#f6f6f6]">
        {/* Image */}
        <img
          className="mx-auto w-2/3 max-w-xs h-auto opacity-50 mt-16"
          alt="No Store Available"
          src={NoOrdersImg}
        />

        {/* Message */}
        <p className="text-[#464646] text-lg font-semibold mb-4">
          아직 주문내역이 없어요
        </p>

        {/* Additional Message */}
        <p className="text-[#6d6d6d] text-sm font-medium mt-4">
          지금 주문하러 가볼까요?
        </p>

        {/* Recommendation Button */}
        <div className="mx-auto w-32 h-10 mt-8 bg-white rounded-md border border-solid border-[#dddddd] flex justify-center items-center cursor-pointer">
          <span className="text-[#5b5b5b] text-sm font-semibold">
            주문하러 가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoOrders;
