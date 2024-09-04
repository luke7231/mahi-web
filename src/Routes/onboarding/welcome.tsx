import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";
import IMG from "./Vector.png";
import { postMessage } from "../../core/message";
import FadeInWrapper from "../../components/fade-in-wrapper";
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
            <img
              className="w-[9rem] max-w-xs h-auto"
              src={IMG}
              alt="Location Illustration"
            />
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

        <button
          className="text-white font-semibold h-[60px] bg-[#1562fc] w-full"
          onClick={onClickButton}
        >
          GO!
        </button>
      </div>
    </div>
  );
};

export default Welcome;
