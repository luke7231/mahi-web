import { useState } from "react";
import { DATA } from "../../data";
import Map from "../maps";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLocation } from "../../core/location-provider";
import { gql } from "../../__generated__";
// localStorage.clear();
const GET_STORES = gql(`
  query Stores($lat: Float, $lng: Float, $userId: Int) {
    stores(lat: $lat, lng: $lng, userId: $userId) {
      id
      lat
      lng
      title
      isLiked
    }
  }
`);
const Home = () => {
  const [isList, setIsList] = useState(true);
  const { hasLastLo, getLocationFromStorage } = useLocation();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_STORES, {
    variables: {
      lat: hasLastLo ? getLocationFromStorage().lat : null,
      lng: hasLastLo ? getLocationFromStorage().lng : null,
      userId: 1,
    },
    onCompleted: (data) => console.log(data),
  });
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
        <div className="mt-8 pl-4 pr-4">
          {loading ? <div>loading...</div> : null}
          {data?.stores?.map((store) => {
            return (
              <div className="h-[120px] shadow-md mb-4 flex items-center rounded-md">
                <div className="ml-2 font-semibold text-[18px]">
                  {store?.title}
                </div>
                <div>{store?.isLiked ? "❤️" : "🤍"}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <Map />
      )}
    </div>
  );
};

export default Home;
