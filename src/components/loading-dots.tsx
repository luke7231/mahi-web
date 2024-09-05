import React from "react";

const LoadingDots = () => {
  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence"></div>
        <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence animation-delay-200"></div>
        <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence animation-delay-400"></div>
      </div>
    </div>
  );
};

export default LoadingDots;
