import React from "react";
import { Sheet } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";

const kakao = window.Kakao;
const WEB_URL = process.env.REACT_APP_URL;

interface LoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  discountRate: number | string;
}

const LoginBottomSheet: React.FC<LoginBottomSheetProps> = ({
  isOpen,
  onClose,
  discountRate,
}) => {
  const navigate = useNavigate();

  const handleKakaoButtonClick = () => {
    localStorage.setItem("redirect", window.location.pathname);
    // 카카오 간편 로그인
    kakao.Auth.authorize({
      redirectUri: `${WEB_URL}/auth`,
      scope: "account_email, profile_nickname",
    });
  };

  return (
    <>
      {/* 오버레이 추가 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose} // 오버레이 클릭 시 닫히도록 설정
        ></div>
      )}

      <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
        <Sheet.Container className="z-50">
          <Sheet.Header />
          <Sheet.Content>
            <div className="p-4 flex flex-col gap-2 mb-2">
              <div className="mb-4 text-xl">
                <div className="text-md text-gray-400">
                  (로그인이 필요한 기능입니다*)
                </div>
                3초만에 로그인 후 <br />
                <span className="font-bold text-[#1562fc] text-2xl">
                  {discountRate}% 할인
                </span>
                을 계속 진행할게요 ⭐
              </div>
              <button
                onClick={handleKakaoButtonClick}
                className="w-full py-4 border border-[#fae300] bg-[#fae300] text-black text-md font-semibold rounded-md flex items-center justify-center hover:bg-[#e8d800] transition duration-150"
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 512 512"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    fill="#000000"
                    d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
                  ></path>
                </svg>
                카카오로 계속하기
              </button>
              <div className="mt-4 text-center">
                <div
                  onClick={() => navigate("/login")}
                  className="text-sm underline text-[#757575] hover:text-[#1562fc]"
                >
                  다른 방법으로 가입하기
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default LoginBottomSheet;
