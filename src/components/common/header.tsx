import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void; // Optional function prop for back button click handler
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  onBackClick,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 w-full">
        {/* Conditionally Render Back Button */}
        {showBackButton ? (
          <button className="flex items-center" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
            >
              <path
                d="M9.5 18.1666L1.33333 9.99996L9.5 1.83329"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="w-[11px]"></div> // Placeholder for alignment
        )}

        {/* Header Title */}
        <div className="flex-1 flex justify-center text-lg font-semibold">
          마이페이지
        </div>

        {/* Placeholder for alignment when back button is not shown */}
        <div className="w-[11px]"></div>
      </div>

      {/* Divider Line */}
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />
    </>
  );
};

export default Header;
