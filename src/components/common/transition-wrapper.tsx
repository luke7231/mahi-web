import React from "react";

const TransitionWrapper = ({
  children,
  onClick,
  className = "",
  scale = 0.9,
  opacity = false,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  scale?: number;
  opacity?: boolean | number;
}) => {
  const scalePercent = scale * 100;
  const opacityValue = typeof opacity === "number" ? opacity : 0.8;
  const opacityClass = opacity ? `active:opacity-${opacityValue * 100}` : "";
  return (
    <div
      className={`transition-transform duration-50 ease-in-out transform active:scale-${scalePercent} ${opacityClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
