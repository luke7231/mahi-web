import React from "react";

// 모달의 props 타입 정의
interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onYes: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onYes }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent) => {
    // 클릭된 요소가 모달 박스가 아닌 경우에만 모달을 닫음
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-12"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg pb-4 pt-16 flex flex-col items-center">
        {/* 모달 제목 */}
        <div className="text-center text-black text-base font-semibold font-['Pretendard'] leading-snug mb-10">
          {title || "변경하시겠습니까?"}
        </div>
        {/* 버튼들 */}
        <div className="w-full flex justify-center mt-4 px-2">
          <button
            className="mr-2 w-full max-w-[125px] h-12 bg-[#1562fc] rounded-[5px] border text-white text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onYes}
          >
            네
          </button>
          <button
            className="w-full max-w-[125px] h-12 bg-[#3c3c3c] rounded-[5px] border text-white text-base font-semibold font-['Pretendard'] leading-snug"
            onClick={onClose}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
