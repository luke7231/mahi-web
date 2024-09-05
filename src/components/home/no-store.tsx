import React from "react";
import NoStoreImg from "./no-store.png";

export const NoStore = (): JSX.Element => {
  return (
    <div className="w-full h-full flex justify-center bg-[#f6f6f6]">
      <div className="relative w-full max-w-sm p-4 text-center bg-[#f6f6f6]">
        {/* Image */}
        <img
          className="mx-auto w-2/3 max-w-xs h-auto opacity-50 mt-16"
          alt="No Store Available"
          src={NoStoreImg}
        />

        {/* Message */}
        <p className="text-[#464646] text-lg font-semibold">
          해당 위치에는 현재 입점된 가게가 없어요.
        </p>
        <p className="text-[#6d6d6d] text-sm font-medium">(반경 5Km 이내)</p>
        {/* Additional Message */}
        <p className="text-[#6d6d6d] text-sm font-medium mt-4">
          빠른 시일내로 입점될 수 있도록 <br />
          노력하겠습니다!
        </p>

        {/* Recommendation Button */}
        <div className="mx-auto w-32 h-10 mt-8 bg-white rounded-md border border-solid border-[#dddddd] flex justify-center items-center cursor-pointer">
          <a
            href="https://forms.gle/PXmEvzq4LsNDC1Gj9"
            className="text-[#5b5b5b] text-sm font-semibold"
          >
            매장 추천하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoStore;
