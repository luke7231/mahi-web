import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth";

const BottomTab = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const pathName = useLocation().pathname;

  const getTabClassName = (path: string) =>
    `flex w-full h-full justify-center items-center text-sm font-semibold cursor-pointer ${
      pathName === path
        ? "text-blue-500 bg-gray-100 border-t-2 border-blue-500"
        : "text-gray-600"
    }`;

  return (
    <div className="fixed bottom-0 w-[380px] h-[56px] grid grid-cols-3 gap-1 items-center p-1 bg-white border-t border-gray-200 shadow-md">
      {/* HOME Tab */}
      <div className={getTabClassName("/")} onClick={() => navigate("/")}>
        <span>HOME</span>
      </div>

      {/* LIKE Tab */}
      <div
        className={getTabClassName("/like")}
        onClick={() => navigate("/like")}
      >
        <span>LIKE</span>
      </div>

      {/* MY Tab */}
      <div
        className={getTabClassName("/my")}
        onClick={() => (isLoggedIn ? navigate("/my") : navigate("/login"))}
      >
        <span>MY</span>
      </div>
    </div>
  );
};

export default BottomTab;
