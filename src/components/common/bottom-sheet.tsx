import React from "react";
import { Sheet } from "react-modal-sheet";
import FadeInWrapper from "../fade-in-wrapper";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOverlay?: boolean;
  mainText?: string;
  subText?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  showOverlay = true,
  mainText,
  subText,
  buttonText,
  onButtonClick,
}) => {
  return (
    <>
      {isOpen && showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
        <Sheet.Container className="z-50">
          <Sheet.Header />
          <Sheet.Content>
            {mainText && (
              <FadeInWrapper>
                <h1 className="ml-4 text-2xl font-bold">{mainText}</h1>
              </FadeInWrapper>
            )}
            {subText && (
              <FadeInWrapper>
                <p className="ml-4 text-md text-gray-500">{subText}</p>
              </FadeInWrapper>
            )}
            {children}
            {buttonText && (
              <button
                className="mt-4 mb-4 mx-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            )}
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default BottomSheet;
