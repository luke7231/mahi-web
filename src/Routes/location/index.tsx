import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { postMessage } from "../../core/message";
import { useLocation } from "../../core/location-provider";

import { gql, useLazyQuery } from "@apollo/client";
import CustomMapMarker2 from "../../components/custome-map-marker2";
import LoadingSpinner from "../../components/loading-spinnere";
import TransitionWrapper from "../../components/common/transition-wrapper";
import { Identify, identify } from "@amplitude/analytics-browser";

const GET_LOCAL_ADDRESS = gql`
  query GetLocalAddress($lat: Float!, $lng: Float!, $pushToken: String) {
    getLocalAddressV2(lat: $lat, lng: $lng, push_token: $pushToken) {
      loadAddr
      area1
      area2
      area3
      area4
    }
  }
`;

const 판교주소_LAT = 37.3595704;
const 판교주소_LNG = 127.105399;

function Location() {
  const [loading, setLoading] = useState(false);
  const { hasLastLo, getLocationFromStorage, setLocationToStorage } =
    useLocation();
  const [getLocalAddress] = useLazyQuery(GET_LOCAL_ADDRESS);
  const navigate = useNavigate();
  const mapElement = useRef<HTMLDivElement | null>(null);

  const { naver } = window;
  let map: naver.maps.Map;
  // 지도가 이동하였을 때 가려진 부분의 마커는 숨기고
  // 노출된 부분의 마커를 표시하는 작업을 하기 위해 map 인스턴스를 state로 관리
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const [newMarker, setNewMarker] = useState<naver.maps.Marker | null>(null);

  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  // [지도를 그리는 effect]
  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }
    // Map 클래스는 지도를 표현하는 클래스
    // new 연산자를 이용하여 새 인스턴스를 생성
    // 변환해놓은 좌표값을 이용하여 지도 중심 인스턴스 생성
    const center = hasLastLo
      ? new naver.maps.LatLng(
          getLocationFromStorage().lat,
          getLocationFromStorage().lng
        )
      : new naver.maps.LatLng(판교주소_LAT, 판교주소_LNG);
    // 지도 옵션 설정둪
    const mapOptions: naver.maps.MapOptions = {
      center,
      zoom: 15,
      minZoom: 7,
      maxZoom: 19,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapDataControl: false,
      scaleControl: false,
    };

    //설정해놓은 옵션을 바탕으로 지도 생성
    map = new naver.maps.Map(mapElement.current, mapOptions);
    setNewMap(map);
    //마커 생성 함수 호출
    const marker = new naver.maps.Marker({
      position: center,
      map,
      clickable: true,
      // [마커 커스터마이징]
      icon: {
        //html element를 반환하는 CustomMapMarker 컴포넌트 할당
        content: CustomMapMarker2(),
        //마커의 기준위치 지정
        anchor: new naver.maps.Point(25, 58),
      },
    });
    setNewMarker(marker);

    // [마커는 항상 맵 중앙에]
    naver.maps.Event.addListener(map, "drag", function (e) {
      const centerCoord = map.getCenter();
      marker.setPosition(centerCoord);
    });
  }, []);

  const clickButton = () => {
    setLoading(true);
    // APP
    // 메세지를 보낸다. 위치값 유저에게 요청하고 위치값 가져오라고.
    postMessage("REQ_CURRENT_LOCATION", "");
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    const listener = (event: any) => {
      const appData = JSON.parse(event?.data);

      if (appData?.type === "RES_CURRENT_LOCATION") {
        const coords = appData.data.coords;
        setCurrentLat(coords.latitude);
        setCurrentLng(coords.longitude);

        newMap?.setZoom(16);
        newMap?.panTo(
          new naver.maps.LatLng(coords.latitude, coords.longitude),
          {
            duration: 0,
          }
        );

        // TODO: 센터 마커도 같이 이동해야함.
        newMarker?.setPosition(
          new naver.maps.LatLng(coords.latitude, coords.longitude)
        );
        newMarker?.setMap(newMap);
        // 로컬스토리지에 저장. (다음부터는 꺼내쓸 수 있도록)
        setLoading(false);
      }
      receiver.removeEventListener("message", listener);
    };

    receiver.addEventListener("message", listener);
  };

  async function onComplete() {
    if (!newMap) return;
    const center = newMap.getCenter();
    await getLocalAddress({
      variables: {
        lat: center.y,
        lng: center.x,
        pushToken: localStorage.getItem("expo_push_token"),
        // responseFormat: "object",
      },
      onCompleted: (data) => {
        if (data.getLocalAddressV2) {
          localStorage.setItem("loadAddr", data.getLocalAddressV2.loadAddr);

          // Amplitude Identify 객체를 사용하여 사용자 속성 업데이트
          const identifyUser = new Identify()
            .set("area1", data.getLocalAddressV2.area1)
            .set("area2", data.getLocalAddressV2.area2)
            .set("area3", data.getLocalAddressV2.area3)
            .set("area4", data.getLocalAddressV2.area4);
          identify(identifyUser);
        }
      },
      onError: () => localStorage.setItem("loadAddr", ""),
    });
    // console.log(res);
    setLocationToStorage(center.y, center.x);
    navigate("/");
  }
  const mapHeight = window.innerHeight - 92; // 1. 위치설정 바 2. 탭 3. 바텀탭
  return (
    <div className="w-[100%] h-full">
      {loading ? <LoadingSpinner /> : null}
      <div
        ref={mapElement}
        id="map"
        style={{ width: "100%", height: mapHeight }}
      >
        <TransitionWrapper
          scale={0.95}
          opacity={0.8}
          className="bg-[#1562fc] rounded-md w-10 h-10 absolute bottom-6 right-6 z-50 text-center flex justify-center items-center text-white"
          onClick={() => clickButton()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="7"></circle>{" "}
            <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
          </svg>
        </TransitionWrapper>
      </div>

      <div>{currentLng ? currentLat : null}</div>
      <div>{currentLng ? currentLng : null}</div>
      <div
        onClick={() => onComplete()}
        className="max-w-[742px] px-5 py-3 w-full fixed bottom-0 z-50 bg-white rounded-tl-[10px] rounded-tr-[10px]"
      >
        <div className="absolute left-0 top-[-1.3rem] w-full h-[24px] bg-[#282828] rounded-tl-[10px] rounded-tr-[10px] text-white text-xs font-semibold flex justify-center items-center">
          5km 내 매장을 찾아드려요!
        </div>
        <TransitionWrapper
          scale={0.95}
          opacity={0.8}
          className=" w-full h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border"
        >
          {/* Button Content */}
          <div className="text-center flex items-center space-x-1">
            <span className="text-white text-base font-semibold leading-snug">
              완료
            </span>
          </div>
        </TransitionWrapper>
      </div>
    </div>
  );
}

export default Location;
