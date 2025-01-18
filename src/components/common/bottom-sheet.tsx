import React from "react";
import { Sheet } from "react-modal-sheet";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOverlay?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  showOverlay = true,
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
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default BottomSheet;
