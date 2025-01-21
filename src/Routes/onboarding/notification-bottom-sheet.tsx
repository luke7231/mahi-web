import BottomSheet from "../../components/common/bottom-sheet";
import IMG from "./bell3.png";
const NotificationBottomSheet = ({
  isOpen,
  onClose,
  onButtonClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onButtonClick: () => void;
}) => {
  return (
    <BottomSheet
      mainText="내가 선택한 매장만 보내드려요"
      subText="불필요한 광고 알림을 받지 않아요!"
      buttonText="네 알겠습니다"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={onButtonClick}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-[120px] h-[120px]"
          src={IMG}
          alt="Notification Illustration"
        />
      </div>
    </BottomSheet>
  );
};

export default NotificationBottomSheet;
