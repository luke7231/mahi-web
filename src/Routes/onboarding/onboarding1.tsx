import { useNavigate } from "react-router-dom";
import IMG from "./location.png";
import FadeInWrapper from "../../components/fade-in-wrapper";
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
