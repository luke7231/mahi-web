import { useState } from "react";
import { DATA } from "../../data";
import Map from "../maps";
import { useNavigate } from "react-router-dom";
// localStorage.clear();
const Home = () => {
  const [isList, setIsList] = useState(true);
  const navigate = useNavigate();
  function onClickLocation() {
    //
  }
  function onClickTab(type: string) {
    if (type === "LIST") {
      setIsList(true);
    } else {
      setIsList(false);
    }
  }
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* LOCATION */}
      <div
        className="p-2 flex border underline font-bold"
        onClick={() => navigate("/location")}
      >
        📍 내 위치를 설정해주세요.
      </div>
      {/* TAB */}
      <div className="pl-6 pr-6 mt-8">
        <div className="flex justify-center  ">
          <div
            className="w-[50%] text-center text-white bg-sky-400 p-4 font-bold rounded-l-xl"
            onClick={() => onClickTab("LIST")}
          >
            리스트
          </div>
          <div
            className="w-[50%] text-center bg-gray-200 p-4 font-bold rounded-r-xl"
            onClick={() => onClickTab("MAP")}
          >
            지도
          </div>
        </div>
      </div>
      {/* LIST */}
      {isList ? (
        <div className="mt-8">
          {DATA.map((data) => {
            return <div>{data.title}</div>;
          })}
        </div>
      ) : (
        <Map />
      )}
    </div>
  );
};

export default Home;
