import React from "react";
import { useNavigate } from "react-router-dom";
import TransitionWrapper from "../../components/common/transition-wrapper";

const PhoneNumberAuthCompleted = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    const redirect = localStorage.getItem("redirect");
    if (redirect) {
      localStorage.removeItem("redirect");
      navigate(redirect);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Success Icon with Bounce and Checkmark Animation */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-[#1692fc] text-white rounded-full flex items-center justify-center animate-bounce-check">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark"
          >
            <path className="checkmark-path" d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Authentication Success Message */}
      <h2 className="text-2xl font-semibold text-black mb-2">
        인증이 완료되었습니다!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        이제 모든 기능을 이용하실 수 있습니다.
      </p>

      {/* Action Buttons */}
      <div className="space-y-3 w-full max-w-sm fixed bottom-8 mx-auto px-4">
        <TransitionWrapper>
          <button
            onClick={onClickButton}
            className="w-full h-[60px] font-bold rounded-3xl transition duration-150 bg-[#1692fc] text-white"
          >
            GO!
          </button>
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default PhoneNumberAuthCompleted;
