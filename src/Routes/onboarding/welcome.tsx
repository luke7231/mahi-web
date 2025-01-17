import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";
import IMG from "./Vector.png";
import { postMessage } from "../../core/message";
import FadeInWrapper from "../../components/fade-in-wrapper";
import TransitionWrapper from "../../components/common/transition-wrapper";
const Welcome = () => {
  const navigate = useNavigate();
  const { doneOnboarding } = useAuth();
  const onClickButton = () => {
    // web
    postMessage("clear_history", "");
    doneOnboarding();
    navigate("/", { replace: true });
  };
  return (
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full max-w-xs h-full flex flex-col justify-center items-center p-4">
          {/* Image */}
          <FadeInWrapper>
            <div className="w-[144px] h-[115px]">
              <img
                className="w-[9rem] max-w-xs h-auto"
                src={IMG}
                alt="Location Illustration"
              />
            </div>
          </FadeInWrapper>

          {/* Text Section */}
          <div className="text-center mt-12">
            <div className="text-black text-3xl font-semibold mb-5">
              환영합니다!
            </div>
            <div className="text-black text-sm font-normal">
              가치 있는 소비,
              <br />
              지역과 지구를 위한 작은 행동의 시작
              <br />
              마감히어로와 함께해요!
            </div>
          </div>
        </div>

        <div className="p-4 inline w-full">
          <TransitionWrapper
            scale={0.9}
            opacity={0.8}
            onClick={onClickButton}
            className="w-full h-[60px] flex items-center justify-center bg-[#C2FC8E] rounded-3xl border"
          >
            <div className="text-center flex items-center space-x-1">
              <span className="text-black font-bold leading-snug">GO!</span>
            </div>
          </TransitionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
