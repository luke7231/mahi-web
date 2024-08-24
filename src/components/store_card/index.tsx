import React from "react";

export const StoreCard = (): JSX.Element => {
  return (
    <div className="w-full h-52">
      <div className="w-full h-full">
        <div className="relative w-full h-full bg-white rounded-[10px] overflow-hidden shadow-[0px_3px_8px_#0000000d]">
          {/* Upper Box */}
          <div className="absolute w-full h-[8.75rem] bg-[url(https://c.animaapp.com/hA9buAad/img/rectangle-1482297@2x.png)] bg-cover bg-center">
            <div className="absolute bottom-0 right-0 bg-black text-white p-2 px-2.5">
              <p className="text-base ">4개 남았어요!</p>
            </div>
            {/* Heart Icon */}
            <img
              className="absolute top-2 right-2 w-8 h-8"
              alt="Favorite Icon"
              src="https://c.animaapp.com/hA9buAad/img/vector.svg"
            />
          </div>

          {/* Lower Box */}
          <div className="absolute w-full bottom-3 left-0 px-4">
            <div className="flex justify-between items-center mt-1">
              <p className="font-semibold text-black text-lg">던킨 가천대점</p>
              <p className="font-bold text-black text-xl">~6,900원</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-base">21:00까지</span> 픽업
                &middot; 도보 약 8분
              </p>
              <div className="text-xs text-gray-400 line-through">12,000원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
