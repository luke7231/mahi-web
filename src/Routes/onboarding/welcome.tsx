import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth";
import IMG from "./Vector.png";
import { postMessage } from "../../core/message";
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
          <img
            className="w-[9rem] max-w-xs h-auto"
            src={IMG}
            alt="Location Illustration"
          />

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="7"
          viewBox="0 0 33 7"
          fill="none"
          className="mb-7 pl-2"
        >
          <circle cx="3.5" cy="3.5" r="3.5" fill="#D9D9D9" />
          <circle cx="16.5" cy="3.5" r="3.5" fill="#1562FC" />
        </svg>
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
