import React from "react";
import { motion } from "framer-motion";

const TapMotionButton = () => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Tap Me
    </motion.div>
  );
};

export default TapMotionButton;
