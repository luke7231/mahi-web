import React, { useState } from "react";

const StoreLocation: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleSetLocation = () => {
    const newLocation = { lat: 37.5665, lng: 126.978 }; // 예시 좌표 (서울)
    setLocation(newLocation);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">매장 위치 설정</h1>

      <div className="border border-gray-300 h-96 mb-6 flex items-center justify-center bg-white rounded-lg shadow-lg">
        {location ? (
          <p className="text-lg">
            위치: {location.lat}, {location.lng}
          </p>
        ) : (
          <p className="text-gray-600">위치가 설정되지 않았습니다.</p>
        )}
      </div>

      <button
        onClick={handleSetLocation}
        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition w-full"
      >
        위치 설정하기
      </button>
    </div>
  );
};

export default StoreLocation;
