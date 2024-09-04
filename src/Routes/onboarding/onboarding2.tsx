import { useNavigate } from "react-router-dom";
import IMG from "./bell3.png";
import FadeInWrapper from "../../components/fade-in-wrapper";
const Onboarding2 = () => {
  const navigate = useNavigate();
  const onClickButton = () => {
    navigate("/welcome");
  };

  return (
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full max-w-xs h-full flex flex-col justify-center items-center p-4">
          {/* Image */}
          <FadeInWrapper>
            <img
              className="w-full max-w-xs h-auto"
              src={IMG}
              alt="Location Illustration"
            />
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

export default Onboarding2;
