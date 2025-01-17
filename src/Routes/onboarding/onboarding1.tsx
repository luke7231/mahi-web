import { useNavigate } from "react-router-dom";
import IMG from "./location.png";
import FadeInWrapper from "../../components/fade-in-wrapper";
import TransitionWrapper from "../../components/common/transition-wrapper";
const Onboarding1 = () => {
  const navigate = useNavigate();
  const onClickButton = () => {
    // app
    // postMessage("REQ_LOCATION", "");
    // web
    navigate("/onboarding2");
  };

  return (
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full max-w-xs h-full flex flex-col justify-center items-center p-4">
          {/* Image */}
          <FadeInWrapper>
            <div className="w-[280px] h-[280px]">
              <img
                className="w-[280px] max-w-xs h-auto"
                src={IMG}
                alt="Location Illustration"
              />
            </div>
          </FadeInWrapper>

          {/* Text Section */}
          <div className="text-center">
            <div className="text-black text-2xl font-semibold mb-5">
              마감 히어로를 통해..
            </div>
            <div className="text-black text-sm font-normal">
              내 근처 마감 상품을 <br />
              빠르게 찾아볼 수 있어요!
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Onboarding1;
