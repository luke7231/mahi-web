import React from "react";
import { motion } from "framer-motion";

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
  const opacityValue = typeof opacity === "number" ? opacity : 0.8;

  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileTap={{
        scale: scale,
        opacity: opacityValue,
      }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
