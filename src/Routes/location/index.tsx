import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomMapMarker from "../../components/custom-map-marker";
import { useNavigate } from "react-router-dom";
import { postMessage } from "../../core/message";
import { useLocation } from "../../core/location-provider";

const 판교주소_LAT = 37.3595704;
const 판교주소_LNG = 127.105399;

function Location() {
  const { hasLastLo, getLocationFromStorage, setLocationToStorage } =
    useLocation();
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
    // 지도 옵션 설정
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
      // icon: {
      //   //html element를 반환하는 CustomMapMarker 컴포넌트 할당
      //   content: CustomMapMarker({ title: name, windowWidth: viewportWidth }),
      //   //마커의 크기 지정
      //   size: new naver.maps.Size(38, 58),
      //   //마커의 기준위치 지정
      //   anchor: new naver.maps.Point(19, 58),
      // },
    });
    setNewMarker(marker);

    // [마커는 항상 맵 중앙에]
    naver.maps.Event.addListener(map, "drag", function (e) {
      const centerCoord = map.getCenter();
      marker.setPosition(centerCoord);
    });
  }, []);

  const clickButton = () => {
    // APP
    // 메세지를 보낸다. 위치값 유저에게 요청하고 위치값 가져오라고.
    // postMessage("REQ_CURRENT_LOCATION", "");
    // const receiver = navigator.userAgent.includes("Android")
    //   ? document
    //   : window;
    // const listener = (event: any) => {
    //   const appData = JSON.parse(event?.data);

    //   if (appData?.type === "RES_CURRENT_LOCATION") {
    //     const coords = appData.data.coords;
    //     setCurrentLat(coords.latitude);
    //     setCurrentLng(coords.longitude);

    //     newMap?.panTo(
    //       new naver.maps.LatLng(coords.latitude, coords.longitude),
    //       {
    //         duration: 0,
    //       }
    //     );

    //     // TODO: 센터 마커도 같이 이동해야함.
    //     newMarker?.setPosition(
    //       new naver.maps.LatLng(coords.latitude, coords.longitude)
    //     );
    //     newMarker?.setMap(newMap);
    //     // 로컬스토리지에 저장. (다음부터는 꺼내쓸 수 있도록)
    //   }
    //   receiver.removeEventListener("message", listener);
    // };

    // receiver.addEventListener("message", listener);

    // WEB
    newMap?.panTo(new naver.maps.LatLng(36.99502164866016, 127.1596148737739), {
      // 안성
      duration: 0,
    });

    // TODO: 센터 마커도 같이 이동해야함.
    newMarker?.setPosition(
      new naver.maps.LatLng(36.99502164866016, 127.1596148737739) // 안성
    );
    newMarker?.setMap(newMap);
  };

  function onComplete() {
    if (!newMap) return;
    const center = newMap.getCenter();
    setLocationToStorage(center.y, center.x);
    navigate("/");
  }
  return (
    <div className="w-[100%]">
      <div ref={mapElement} id="map" style={{ width: "100%", height: "70vh" }}>
        <div
          className="bg-sky-400 rounded-md w-8 h-8 absolute bottom-6 right-6 z-50 text-center text-white"
          onClick={() => clickButton()}
        >
          L
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className="pl-2 pr-2 mt-2">
        <div
          className="bg-sky-400 rounded-xl font-bold text-white p-3 text-lg text-center"
          onClick={() => onComplete()}
        >
          선택한 위치로 설정
        </div>
      </div>
      <div>{currentLng ? currentLat : null}</div>
      <div>{currentLng ? currentLng : null}</div>
    </div>
  );
}

export default Location;
