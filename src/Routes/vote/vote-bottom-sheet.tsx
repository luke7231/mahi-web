import React from "react";
import BottomSheet from "../../components/common/bottom-sheet";

interface VoteBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  onButtonClick: () => void;
  checklist: string[];
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
      subText="소중한 투표는 백현동 로컬을 살리는데 쓰입니다."
      buttonText="네 맞습니다"
      isOpen={isOpen}
      onClose={onClose}
      showOverlay={showOverlay}
      onButtonClick={onButtonClick}
    >
      <div className="p-6 flex flex-col items-center gap-4">
        {checklist.map((store, index) => (
          <p key={index} className="text-lg font-medium">
            {store}
          </p>
        ))}
      </div>
    </BottomSheet>
  );
};

export default VoteBottomSheet;
