// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../core/auth";

// const BottomTab = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const pathName = useLocation().pathname;

//   const getTabClassName = (path: string) =>
//     `flex w-full h-full justify-center items-center text-sm font-semibold cursor-pointer ${
//       pathName === path
//         ? "text-blue-500 bg-gray-100 border-t-2 border-blue-500"
//         : "text-gray-600"
//     }`;

//   return (
//     <div className="fixed bottom-0 w-[380px] h-[56px] grid grid-cols-3 gap-1 items-center p-1 bg-white border-t border-gray-200 shadow-md">
//       {/* HOME Tab */}
//       <div className={getTabClassName("/")} onClick={() => navigate("/")}>
//         <span>HOME</span>
//       </div>

//       {/* LIKE Tab */}
//       <div
//         className={getTabClassName("/like")}
//         onClick={() => (isLoggedIn ? navigate("/like") : navigate("/login"))}
//       >
//         <span>LIKE</span>
//       </div>

//       {/* MY Tab */}
//       <div
//         className={getTabClassName("/my")}
//         onClick={() => (isLoggedIn ? navigate("/my") : navigate("/login"))}
//       >
//         <span>MY</span>
//       </div>
//     </div>
//   );
// };

// export default BottomTab;

// import React from "react";

// const BottomTab = (): JSX.Element => {
//   return (
//     <div className="relative w-[374px] h-[97px]">
//       <div className="fixed w-[374px] h-[97px] top-0 left-0 bg-white shadow-[0px_-2px_26px_#00000026]">
//         <div className="absolute w-[26px] h-[46px] top-[13px] left-[46px]">
//           <div className="relative h-[46px]">
//             <div className="top-[27px] left-2 absolute [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[11px] text-center tracking-[-0.22px] leading-[16.5px] whitespace-nowrap">
//               홈
//             </div>
//             <img
//               className="absolute w-6 h-6 top-px left-px"
//               alt="Home outline"
//               src="home-outline.svg"
//             />
//           </div>
//         </div>
//         <div className="absolute w-[26px] h-[46px] top-[13px] left-[132px] opacity-40">
//           <div className="relative h-[46px]">
//             <div className="top-[27px] left-[7px] absolute [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[11px] text-center tracking-[-0.22px] leading-[16.5px] whitespace-nowrap">
//               찜
//             </div>
//             <img
//               className="absolute w-[25px] h-[25px] top-px left-0"
//               alt="Heart outline"
//               src="heart-outline.svg"
//             />
//           </div>
//         </div>
//         <div className="absolute w-10 h-[45px] top-[13px] left-[211px] opacity-40">
//           <div className="top-7 left-0 absolute [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[11px] text-center tracking-[-0.22px] leading-[16.5px] whitespace-nowrap">
//             주문내역
//           </div>
//           <img
//             className="absolute w-6 h-6 top-0 left-[7px]"
//             alt="Clipboard list"
//             src="clipboard-list-outline.svg"
//           />
//         </div>
//         <div className="absolute w-[49px] h-[41px] top-[17px] left-[293px] opacity-40">
//           <div className="top-6 left-0 absolute [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-black text-[11px] text-center tracking-[-0.22px] leading-[16.5px] whitespace-nowrap">
//             마이페이지
//           </div>
//           <img
//             className="absolute w-5 h-5 -top-px left-3"
//             alt="Vector"
//             src="vector.svg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth";

const BottomTab = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    // <div className="fixed bottom-0 w-full max-w-[380px] h-[64px] bg-white shadow-[0px_-2px_26px_#00000026]">
    <div className="z-10 fixed bottom-0 w-full max-w-[742px] h-[64px] bg-white shadow-[0px_-2px_26px_#00000026]">
      <div className="flex justify-evenly items-center h-full">
        {/* Home Tab */}
        <div
          className={`flex flex-col items-center ${
            location.pathname === "/" ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H9M19 10L21 12M19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H15M9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21M9 21H15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="w-12 text-center text-sm font-semibold">홈</p>
        </div>

        {/* Favorites Tab */}
        <div
          className={`flex flex-col items-center ${
            location.pathname === "/like" ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => (isLoggedIn ? navigate("/like") : navigate("/login"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 26 25"
            fill="none"
          >
            <path
              d="M4.82315 4.58121C4.38787 5.01648 4.04259 5.53323 3.80702 6.10195C3.57144 6.67067 3.4502 7.28022 3.4502 7.89579C3.4502 8.51137 3.57144 9.12092 3.80702 9.68963C4.04259 10.2584 4.38787 10.7751 4.82315 11.2104L12.8252 19.2125L20.8273 11.2104C21.7064 10.3313 22.2003 9.139 22.2003 7.89579C22.2003 6.65258 21.7064 5.46029 20.8273 4.58121C19.9482 3.70213 18.7559 3.20826 17.5127 3.20826C16.2695 3.20826 15.0772 3.70213 14.1982 4.58121L12.8252 5.95413L11.4523 4.58121C11.017 4.14593 10.5003 3.80064 9.93158 3.56507C9.36286 3.3295 8.75331 3.20825 8.13774 3.20825C7.52216 3.20825 6.91261 3.3295 6.34389 3.56507C5.77518 3.80064 5.25843 4.14593 4.82315 4.58121Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="w-12 text-center text-sm font-semibold">관심매장</p>
        </div>

        {/* Order History Tab */}
        {/* <div
          className={`flex flex-col items-center ${
            location.pathname === "/order" ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => (isLoggedIn ? navigate("/order") : navigate("/login"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.5 10H15.7143M11.5 14H15.7143M8.28571 10H8.29643M8.28571 14H8.29643M15.7143 4H6.14286C5.57454 4 5.02949 4.21071 4.62763 4.58579C4.22576 4.96086 4 5.46957 4 6V18C4 18.5304 4.22576 19.0391 4.62763 19.4142C5.02949 19.7893 5.57454 20 6.14286 20H17.8571C18.4255 20 18.9705 19.7893 19.3724 19.4142C19.7742 19.0391 20 18.5304 20 18V6C20 5.46957 19.7742 4.96086 19.3724 4.58579C18.9705 4.21071 18.4255 4 17.8571 4H15.7143Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="w-12 text-center mb-0.5 text-sm font-semibold">
            주문내역
          </p>
        </div> */}

        {/* My Page Tab */}
        <div
          className={`flex flex-col items-center ${
            location.pathname === "/my" ? "opacity-100" : "opacity-40"
          }`}
          onClick={() => (isLoggedIn ? navigate("/my") : navigate("/login"))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.828 12.828C12.0779 13.5779 11.0607 13.9991 10 13.9991C8.93934 13.9991 7.92211 13.5779 7.172 12.828M7 8H7.01M13 8H13.01M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="w-13 mt-0.5 text-center text-sm font-semibold">
            마이페이지
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
