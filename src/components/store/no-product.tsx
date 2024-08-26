import React from "react";
import NoProductImg from "./hero-icon.png";

export const NoProduct = (): JSX.Element => {
  return (
    <div className="w-full h-full flex justify-center bg-[#f6f6f6]">
      <div className="relative w-full max-w-sm p-4 text-center bg-[#f6f6f6]">
        {/* Image */}
        <img
          className="mx-auto w-1/3 max-w-xs h-auto opacity-50 mt-16 mb-[22px]"
          alt="No Store Available"
          src={NoProductImg}
        />

        {/* Message */}
        <p className="text-[#464646] text-lg font-semibold mb-[8px]">
          아직 마감팩이 나오지 않았어요.
        </p>

        {/* Additional Message */}
        <p className="text-[#6d6d6d] text-sm font-medium mb-[28px]">
          신선한 마감팩 알림을 받아보세요
        </p>

        {/* Recommendation Button */}
        <div className="mx-auto w-32 h-10 mb-[82px] bg-white rounded-md border border-solid border-[#dddddd] flex justify-center items-center cursor-pointer">
          <span className="text-[#5b5b5b] text-sm font-semibold">
            이 매장 찜하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoProduct;
