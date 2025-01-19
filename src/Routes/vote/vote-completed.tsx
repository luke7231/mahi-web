import React from "react";
import { useNavigate } from "react-router-dom";
import TransitionWrapper from "../../components/common/transition-wrapper";

const VoteCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Success Icon with Bounce and Checkmark Animation */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-[#1562fc] text-white rounded-full flex items-center justify-center animate-bounce-check">
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

      {/* Vote Success Message */}
      <h2 className="text-2xl font-semibold text-black mb-2">
        투표가 완료되었어요!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        백현동에 더 많은
        <br />
        매장이 생길 거예요!
      </p>

      {/* Action Buttons */}
      <div className="space-y-3 w-full max-w-sm fixed bottom-8 mx-auto px-4">
        <TransitionWrapper>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-[#1562fc] text-white rounded-xl hover:bg-[#124ab7] transition duration-150"
          >
            홈으로 가기
          </button>
        </TransitionWrapper>
        <TransitionWrapper>
          <button
            onClick={() => navigate("/vote")}
            className="w-full py-3 border border-[#1562fc] text-[#1562fc] rounded-xl hover:bg-[#f0f8ff] transition duration-150"
          >
            다른 투표 보기
          </button>
        </TransitionWrapper>
      </div>
    </div>
  );
};

export default VoteCompleted;
