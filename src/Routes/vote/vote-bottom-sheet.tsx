import React from "react";
import BottomSheet from "../../components/common/bottom-sheet";

interface VoteBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  onButtonClick: () => void;
  checklist: { id: number; name: string }[];
}

const VoteBottomSheet: React.FC<VoteBottomSheetProps> = ({
  isOpen,
  onClose,
  onButtonClick,
  showOverlay = true,
  checklist,
}) => {
  return (
    <BottomSheet
      mainText="이 매장들이 맞나요?"
      subText="저희가 열심히 모셔볼게요!"
      buttonText="네 맞습니다"
      isOpen={isOpen}
      onClose={onClose}
      showOverlay={showOverlay}
      onButtonClick={onButtonClick}
    >
      <div className="p-6 flex flex-col items-center gap-4">
        {checklist.slice(0, 8).map((store, index) => (
          <p key={index} className="text-lg font-medium">
            {store.name}
          </p>
        ))}
        {checklist.length > 8 && (
          <p className="text-lg font-medium">...외 {checklist.length - 10}개</p>
        )}
      </div>
    </BottomSheet>
  );
};

export default VoteBottomSheet;
