import React from "react";
import HeartIcon from "../common/heart";

interface IProp {
  onClick: () => void;
  onClickHeart: (e: React.MouseEvent) => void;
  quantity: number;
  title: string;
  saleEndTime: string;
  discountPrice: number;
  price: number;
  isLiked: boolean | undefined | null;
  img: string;
}

export const StoreCard = ({
  quantity,
  title,
  saleEndTime,
  discountPrice,
  price,
  onClick,
  onClickHeart,
  img,
  isLiked,
}: IProp): JSX.Element => {
  // saleEndTime을 Date 객체로 변환
  const date = new Date(saleEndTime);

  // 시와 분 추출
  let hours = date.getUTCHours(); // 한국 시간에서 UTC로 변환하려면 9시간을 빼야 합니다
  let minutes = date.getUTCMinutes();

  // 시와 분을 2자리로 포맷
  //   if (hours < 0) {
  //     hours += 24; // 24시간 형식으로 조정
  //   }
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // 시와 분을 원하는 형식으로 조합
  const timeString = `${formattedHours}:${formattedMinutes}`;
  return (
    <div className="w-full h-52" onClick={onClick}>
      <div className="w-full h-full">
        <div className="relative w-full h-full bg-white rounded-[10px] overflow-hidden shadow-[0px_3px_8px_#0000000d]">
          {/* Upper Box */}
          <div
            className="absolute w-full h-[8.75rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute bottom-0 right-0 bg-black text-white p-2 px-2.5">
              <p className="text-base ">{quantity}개 남았어요!</p>
            </div>
            {/* Heart Icon */}
            <HeartIcon onClick={onClickHeart} isLiked={isLiked} />
          </div>

          {/* Lower Box */}
          <div className="absolute w-full bottom-3 left-0 px-4">
            <div className="flex justify-between items-center mt-1">
              <p className="font-semibold text-black text-lg">{title}</p>
              <p className="font-bold text-black text-xl">
                ~{discountPrice?.toLocaleString()}원
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
                    {timeString}까지
                  </span>{" "}
                  <span className="text-[#b6b6b6]">픽업 &middot; 도보</span> 약
                  8분
                </p>
              </div>
              <div className="text-xs text-gray-400 line-through">
                {price?.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
