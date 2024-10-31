const AlarmButton = ({
  isLiked,
  onClick,
}: {
  isLiked?: boolean | undefined | null;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div onClick={onClick}>
      {isLiked ? (
        <div className="absolute right-2 bottom-1 p-2 px-4 h-10 bg-[#f6f6f6] rounded-md border border-solid border-[#dddddd] flex item-center cursor-pointer">
          <span
            className="text-black text-sm font-semibold flex items-center"
            onClick={onClick}
          >
            알림 받는중
          </span>
        </div>
      ) : (
        <div className="absolute right-2 bottom-1 p-2 px-4 h-10 bg-[#1562fc] rounded-md border border-solid border-[#dddddd] flex item-center cursor-pointer">
          <span
            className="text-white text-sm font-semibold flex items-center"
            onClick={onClick}
          >
            알림 기다리기
          </span>
        </div>
      )}
    </div>
  );
};
export default AlarmButton;
