import React from "react";
import HeartIcon from "../common/heart";
import AlarmButton from "../common/alram-button";
import TransitionWrapper from "../common/transition-wrapper";

interface IProp {
  onClick: () => void;
  onClickHeart: (e: React.MouseEvent) => void;
  onClickNoti?: (e: React.MouseEvent) => void;
  quantity: number | undefined;
  title: string;
  closingHours: string;
  discountPrice?: number | null | undefined;
  price: number;
  isLiked: boolean | undefined | null;
  img: string;
  distance?: number | null;
  disableLike?: boolean;
}

export const StoreCard = ({
  quantity,
  title,
  closingHours,
  discountPrice,
  price,
  onClick,
  onClickHeart,
  onClickNoti,
  img,
  isLiked,
  distance,
  disableLike = false,
}: IProp): JSX.Element => {
  return (
    <TransitionWrapper
      scale={0.9}
      opacity={0.8}
      className="w-full h-52"
      onClick={onClick}
    >
      <div className="w-full h-full">
        <div className="relative w-full h-full bg-white rounded-[10px] overflow-hidden shadow-[0px_3px_8px_#0000000d]">
          {/* Upper Box */}
          <div
            className="absolute w-full h-[8.75rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >
            {quantity !== 0 && (
              <div className="absolute bottom-0 right-0 bg-black text-white p-2 px-2.5">
                <p className="text-base ">{quantity}개 남았어요!</p>
              </div>
            )}
            {/* Heart Icon */}
            {!disableLike && (
              <HeartIcon onClick={onClickHeart} isLiked={isLiked} />
            )}
          </div>

          {/* Lower Box */}
          <div className="absolute w-full bottom-3 left-0 px-4">
            <div className="flex justify-between items-center mt-1">
              <p className="font-semibold text-black text-lg">{title}</p>
              <p className="font-bold text-black text-xl">
                {discountPrice ? `~${discountPrice?.toLocaleString()}원` : null}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="mr-[1px] mt-[1px]"
                >
                  <path
                    d="M5.5 3.5V5.5L7 7M10 5.5C10 6.09095 9.8836 6.67611 9.65746 7.22208C9.43131 7.76804 9.09984 8.26412 8.68198 8.68198C8.26412 9.09984 7.76804 9.43131 7.22208 9.65746C6.67611 9.8836 6.09095 10 5.5 10C4.90905 10 4.32389 9.8836 3.77792 9.65746C3.23196 9.43131 2.73588 9.09984 2.31802 8.68198C1.90016 8.26412 1.56869 7.76804 1.34254 7.22208C1.1164 6.67611 1 6.09095 1 5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1C6.69347 1 7.83807 1.47411 8.68198 2.31802C9.52589 3.16193 10 4.30653 10 5.5Z"
                    stroke="#585858"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-base">
                    {closingHours}까지
                  </span>{" "}
                  <span className="text-[#b6b6b6]">
                    {distance ? distance?.toFixed(2) + "km" : ""}
                  </span>
                </p>
              </div>
              {price ? (
                <div className="text-xs text-gray-400 line-through">
                  ~{price?.toLocaleString()}원
                </div>
              ) : (
                <>
                  {!disableLike && (
                    <AlarmButton onClick={onClickNoti} isLiked={isLiked} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};
