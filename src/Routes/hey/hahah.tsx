// Haha.js
import React from "react";
import { useLocation } from "react-router-dom";

const Haha = () => {
  // useLocation 훅을 사용하여 현재 URL의 정보를 가져옴
  const location = useLocation();

  // 쿼리 문자열을 파싱하기 위해 URLSearchParams 사용
  const queryParams = new URLSearchParams(location.search);

  // 예시로 "status"와 "transactionId" 쿼리 파라미터 가져오기
  const status = queryParams.get("status") || "No status provided";

  return (
    <div>
      <h1>결제 결과</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default Haha;
