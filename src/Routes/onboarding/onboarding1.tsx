import { useNavigate } from "react-router-dom";
import { postMessage } from "../../core/message";
import { useEffect, useState } from "react";
import { useAuth } from "../../core/auth";
import IMG from "./location.png";
const Onboarding1 = () => {
  const navigate = useNavigate();
  const { doneOnboarding } = useAuth();
  const onClickButton = () => {
    // app
    // postMessage("REQ_LOCATION", "");
    // web
    navigate("/welcome");
  };

  useEffect(() => {
    // rn에서 Webview로 보낸 값을 수신하는 함수
    const listener = (event: any) => {
      if (typeof event.data === "string" && event.data.startsWith(`{"type"`)) {
        const appData = JSON.parse(event?.data);
        if (appData?.type === "DONE") {
          navigate("/welcome");
        }
      }
    };
    // android, ios 구분하는 코드
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    receiver.addEventListener("message", listener);

    // Clean-up 함수: 컴포넌트가 언마운트될 때 실행
    return () => {
      receiver.removeEventListener("message", listener);
    };
  }, []);
  return (
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full max-w-xs h-full flex flex-col justify-center items-center p-4">
          {/* Image */}
          <img
            className="w-full max-w-xs h-auto"
            src={IMG}
            alt="Location Illustration"
          />

          {/* Text Section */}
          <div className="text-center">
            <div className="text-black text-2xl font-semibold mb-5">
              위치 설정이 필요해요
            </div>
            <div className="text-black text-sm font-normal">
              위치 설정에 동의하시면
              <br />내 근처 마감 상품을 볼 수 있어요!
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="7"
          viewBox="0 0 33 7"
          fill="none"
          className="mb-7  pl-2"
        >
          <circle cx="3.5" cy="3.5" r="3.5" fill="#1562FC" />
          <circle cx="16.5" cy="3.5" r="3.5" fill="#D9D9D9" />
        </svg>
        <button
          className="text-white font-semibold h-[60px] bg-[#1562fc] w-full"
          onClick={onClickButton}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Onboarding1;
