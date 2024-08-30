import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1562fc] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
