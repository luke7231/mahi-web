import React, { useState } from "react";
import BottomSheet from "../../components/common/bottom-sheet";

const PickUpTimeBottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
}) => {
  const getDefaultTime = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    const minutes = date.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 5) * 5;
    date.setMinutes(roundedMinutes);
    return date.toTimeString().slice(0, 5);
  };

  const [pickUpTime, setPickUpTime] = useState(getDefaultTime());

  const handleConfirm = () => {
    onConfirm(pickUpTime);
    onClose();
  };

  const adjustTime = (minutes: number) => {
    const [hours, mins] = pickUpTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);

    const newHours = date.getHours().toString().padStart(2, "0");
    const newMinutes = date.getMinutes().toString().padStart(2, "0");
    setPickUpTime(`${newHours}:${newMinutes}`);
  };

  return (
    <BottomSheet
      mainText="픽업(도착) 시간이 어떻게 될까요?"
      subText="바로 가져가실 수 있게 준비해드릴게요!"
      buttonText="확인"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={handleConfirm}
    >
      <div className="flex flex-col items-center justify-center">
        <input
          type="time"
          value={pickUpTime}
          onChange={(e) => setPickUpTime(e.target.value)}
          className="mx-4 mt-6 p-4 rounded-lg font-bold text-lg"
          autoFocus
          style={{ fontSize: "1.5rem", height: "3rem" }}
        />
        <div className="flex items-center my-6 space-x-2">
          <button
            onClick={() => adjustTime(-10)}
            className="p-2 bg-red-100 text-red-500 rounded-lg"
          >
            -10분
          </button>
          <button
            onClick={() => adjustTime(-5)}
            className="p-2 bg-red-100 text-red-500 rounded-lg"
          >
            -5분
          </button>

          <button
            onClick={() => adjustTime(5)}
            className="p-2 bg-[#1692fc] text-white rounded-lg"
          >
            +5분
          </button>
          <button
            onClick={() => adjustTime(10)}
            className="p-2 bg-[#1692fc] text-white rounded-lg"
          >
            +10분
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default PickUpTimeBottomSheet;
