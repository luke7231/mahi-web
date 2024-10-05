import { track } from "@amplitude/analytics-browser";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NiceResult = () => {
  const location = useLocation();

  // URLSearchParams를 이용해 쿼리 파라미터를 파싱합니다.
  const queryParams = new URLSearchParams(location.search);

  // 특정 쿼리 파라미터 값을 가져옵니다.
  const ok = queryParams.get("ok"); // 예: ?paramName=value
  const message = queryParams.get("message"); // 예: ?paramName=value
  const amount = queryParams.get("amount"); // 예: ?paramName=value
  useEffect(() => {
    if (ok) {
      track("결제 완료", {
        amount,
      });
    }
  }, [ok]);
  return ok == "1" ? (
    <PaymentCompleted amount={amount} />
  ) : (
    <PaymentFailed message={message} />
  );
};
const PaymentCompleted = ({ amount }: { amount: string | null }) => {
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="checkmark"
          >
            <path className="checkmark-path" d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Payment Success Message */}
      <h2 className="text-2xl font-semibold text-black mb-2">
        결제가 완료되었습니다!
      </h2>
      <p className="text-gray-600 mb-6">주문이 성공적으로 처리되었습니다.</p>

      {/* Payment Details */}
      <div className="bg-[#f3f3f3] py-3 px-4 rounded-md mb-6">
        <p className="text-gray-800">
          총 결제 금액:{" "}
          <span className="text-black font-semibold">
            {Number(amount).toLocaleString()}원
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
        >
          홈으로 가기
        </button>
        <button
          onClick={() => navigate("/order")}
          className="w-full py-3 border border-[#1562fc] text-[#1562fc] rounded-md hover:bg-[#f0f8ff] transition duration-150"
        >
          주문 내역 보기
        </button>
      </div>
    </div>
  );
};

const PaymentFailed = ({ message }: { message: string | null }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Failure Icon with Bounce Animation */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-red-500  text-white rounded-full flex items-center justify-center animate-bounce-check">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="failure-icon"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Payment Failed Message */}
      <h2 className="text-2xl font-semibold text-black mb-2">
        결제가 실패하였습니다!
      </h2>
      <p className="text-gray-600 mb-6">
        {message ||
          "결제를 처리하는 중 에러가 발생했습니다. 다시 시도해주세요!"}
      </p>

      {/* Action Buttons */}
      <div className="space-y-3 w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-[#124ab7] transition duration-150"
        >
          홈으로 가기
        </button>
        <button
          onClick={() => navigate("/order")}
          className="w-full py-3 border border-[#1562fc] text-[#1562fc] rounded-md hover:bg-[#f0f8ff] transition duration-150"
        >
          주문 내역 보기
        </button>
      </div>
    </div>
  );
};

export default NiceResult;
