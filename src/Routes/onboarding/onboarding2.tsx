import { useNavigate } from "react-router-dom";
import IMG from "./bell3.png";
import FadeInWrapper from "../../components/fade-in-wrapper";
import { postMessage } from "../../core/message";
import TransitionWrapper from "../../components/common/transition-wrapper";
import NotificationBottomSheet from "./notification-bottom-sheet";
import { useState } from "react";
const Onboarding2 = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onClickConfirm = () => {
    // TODO: 다음 앱 심사 때 넣어서 나가야함.
    postMessage("REQ_NOTIFICATION", "");
    navigate("/welcome");
  };

  const onClickButton = () => {
    setIsOpen(true);
  };

  const onCloseNotification = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full max-w-xs h-full flex flex-col justify-center items-center p-4">
          {/* Image */}
          <FadeInWrapper>
            <div className="w-[280px] h-[280px]">
              <img
                className="w-full max-w-xs h-auto"
                src={IMG}
                alt="Location Illustration"
              />
            </div>
          </FadeInWrapper>
          {/* Text Section */}
          <div className="text-center">
            <div className="text-black text-2xl font-semibold mb-5">
              OO동에 새로운 재고가 나왔어요~!
            </div>
            <div className="text-black text-sm font-normal">
              내가 선택한 동네의 마감 상품 소식을 <br />
              빠르게 받아볼 수 있어요!
            </div>
          </div>
        </div>

        {/* <button
          className="text-white font-semibold h-[60px] bg-[#1562fc] w-full"
          >
          다음
          </button> */}
        <div className="p-4 inline w-full">
          <TransitionWrapper
            scale={0.9}
            opacity={0.8}
            onClick={onClickButton}
            className="w-full h-[60px] flex items-center justify-center bg-[#1562fc] rounded-3xl border"
          >
            <div className="text-center flex items-center space-x-1">
              <span className="text-white font-bold leading-snug">다음</span>
            </div>
          </TransitionWrapper>
        </div>
      </div>
      <NotificationBottomSheet
        isOpen={isOpen}
        onClose={onCloseNotification}
        onButtonClick={onClickConfirm}
      />
    </div>
  );
};

export default Onboarding2;
