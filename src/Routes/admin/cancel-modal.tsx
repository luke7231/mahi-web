import React, { useState } from "react";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: (reason: string) => void; // Accepts reason
  onCancel: () => void;
  reason: string;
  handleReason: (reason: string) => void;
}

const CancelModal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  reason,
  handleReason,
}) => {
  const [error, setError] = useState<string>(""); // 에러 메시지 상태 추가

  const handleConfirm = () => {
    if (!reason.trim()) {
      // 사유가 비어 있으면 에러 메시지 설정
      setError("취소 사유를 입력해주세요.");
      return;
    }
    setError(""); // 에러 메시지 초기화
    onConfirm(reason); // 사유 전달
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        {/* Reason Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            취소 사유
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => handleReason(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring focus:ring-blue-500"
            }`}
            placeholder="사유를 입력하세요"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            아니오
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
