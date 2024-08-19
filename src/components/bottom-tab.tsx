import HomeImg from "../images/icons/home_icon.png";
import HomeImgInactive from "../images/icons/home_icon_inactive.png";
import CameraImg from "../images/icons/camera_icon.png";
import CameraImgActive from "../images/icons/camera_icon_active.png";
import GalaryImg from "../images/icons/galary_icon.png";
import GalaryImgActive from "../images/icons/galary_icon_active.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth";

const BottomTab = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const pathName = useLocation().pathname;
  return (
    <div className="fixed bottom-0 w-full h-[56px] grid grid-cols-3 gap-1 items-center p-1 bg-white">
      <div className="flex w-full h-full justify-center items-center">
        {/* <Camera
          src={pathName === "/send" ? CameraImgActive : CameraImg}
          onClick={() => navigate("/send")}
        /> */}
        <div onClick={() => navigate("/")}>HOME</div>
      </div>
      {/* <Partition /> */}
      <div
        className="flex w-full h-full justify-center items-center"
        style={{
          borderRight: "2px solid #CDD4BA",
          borderLeft: "2px solid #CDD4BA",
        }}
      >
        <div onClick={() => navigate("/like")}>LIKE</div>
        {/* <Home
          src={pathName === "/" ? HomeImg : HomeImgInactive}
          onClick={() => navigate("/")}
        /> */}
      </div>
      {/* <Partition /> */}
      <div className="flex w-full h-full justify-center items-center">
        {/* <Galary
          src={pathName === "/posts" ? GalaryImgActive : GalaryImg}
          onClick={() => navigate("/posts")}
        /> */}
        <div
          onClick={() => (isLoggedIn ? navigate("/my") : navigate("/login"))}
        >
          MY
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
