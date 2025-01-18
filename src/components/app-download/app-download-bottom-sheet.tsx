import React from "react";
import { getDownloadLink } from "../../Lib/app-download-link-utils";
import AppLogo from "./mahi-download-logo-512.png"; // 앱 로고 이미지 경로를 조정하세요
import BottomSheet from "../common/bottom-sheet"; // 새로운 컴포넌트 경로

interface AppDownloadBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
}

const AppDownloadBottomSheet: React.FC<AppDownloadBottomSheetProps> = ({
  isOpen,
  onClose,
  showOverlay = true,
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} showOverlay={showOverlay}>
      <div className="p-6 flex flex-col items-center gap-4">
        {/* 로고와 제목 */}
        <img src={AppLogo} alt="App Logo" className="w-20 h-20 mb-2" />
        <h2 className="text-lg font-bold text-gray-800 text-center">
          마감히어로를 사용한 사람은
          <br /> 식비/간식비를 <span className="text-purple-600">20%</span>{" "}
          절약하셨어요.
        </h2>
        <p className="text-md text-gray-600 text-center">
          정말 필요한 정보만 알려드릴게요!
        </p>

        {/* 버튼 영역 */}
        <div className="flex gap-4 mt-4 w-full max-w-xs">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="flex-[3] py-3 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200"
          >
            닫기
          </button>

          {/* 다운로드 버튼 */}
          <a
            href={getDownloadLink()}
            className="flex-[7] py-3 bg-[#1692fc] text-white font-bold rounded-lg shadow-md flex items-center justify-center hover:bg-[#1177cc] transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            다운로드하고 알림받기
          </a>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AppDownloadBottomSheet;
