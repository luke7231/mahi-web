import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomMapMarker from "../../components/custom-map-marker";
import { useNavigate } from "react-router-dom";
import { DATA, IData } from "../../data";

function Location() {
  const navigate = useNavigate();
  const mapElement = useRef<HTMLDivElement | null>(null);
  // const [searchKeyword, setSearchKeyword] = useState(
  //   "안성시 공도읍 서동대로 4060-5, 효성해링턴플레이스 202동 306호 "
  // );
  const [AddressY, setAddressY] = useState<number>(37.3595704);
  const [AddressX, setAddressX] = useState<number>(127.105399);

  const { naver } = window;
  let map: naver.maps.Map;
  // 지도가 이동하였을 때 가려진 부분의 마커는 숨기고
  // 노출된 부분의 마커를 표시하는 작업을 하기 위해 map 인스턴스를 state로 관리
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);

  // [지도를 그리는 effect]
  // 중심이 될 위경도 값이 변경되면 지도를 새로 그려야하므로
  // useEffect를 사용하고, 좌표값 +a (필요한 상태)를 의존성 배열에 추가합니다.
  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }
    // Map 클래스는 지도를 표현하는 클래스
    // new 연산자를 이용하여 새 인스턴스를 생성
    // 변환해놓은 좌표값을 이용하여 지도 중심 인스턴스 생성
    const center = new naver.maps.LatLng(AddressY, AddressX);
    // 지도 옵션 설정
    const mapOptions: naver.maps.MapOptions = {
      //center 옵션에 생성한 지도 중심 인스턴스 넣기
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
      position: new naver.maps.LatLng(37.3595704, 127.105399), // 이거 조정 필요 내 위치로
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
    // [마커는 항상 맵 중앙에]
    naver.maps.Event.addListener(map, "drag", function (e) {
      const centerCoord = map.getCenter();
      marker.setPosition(centerCoord);
    });
  }, [AddressX, AddressY]);

  //마커를 담을 배열
  const createMarkerList: naver.maps.Marker[] = [];

  // [반복문을 통해 데이터 배열 순회하면서 마커 생성 진행하는 함수]
  const addMarkers = () => {
    for (let i = 0; i < DATA.length; i++) {
      let markerObj = DATA[i];
      const { dom_id, title, lat, lng } = markerObj;
      addMarker(dom_id, title, lat, lng);
    }
  };

  // [마커를 배열에 추가하는 함수]
  const addMarker = (id: string, name: string, lat: number, lng: number) => {
    try {
      let newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lng, lat),
        map,
        title: name,
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
      newMarker.setTitle(name);
      //마커리스트에 추가
      createMarkerList.push(newMarker);
      //마커에 이벤트 핸들러 등록
      naver.maps.Event.addListener(newMarker, "click", () =>
        markerClickHandler(id)
      );
    } catch (e) {}
  };

  // [마커객체 하나를 클릭했을 때 실행할 이벤트 핸들러]
  const markerClickHandler = (id: string) => {
    // navigate(`/ground/${id}`);
    console.log("clicked: 🚀", id);
  };

  // [현재 뷰포트를 상태로 저장]
  // const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // [리사이즈 시 view port를 변경하는 이펙트]
  // useEffect(() => {
  //   const handleResize = () => {
  //     setViewportWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const clickButton = () => {
    // 원래 자리로 옮기는 것
    newMap?.panTo(new naver.maps.LatLng(37.3595704, 127.105399), {
      duration: 0,
    });
    console.log("내 현재 위치로 돌아오면서 재 정렬한다?");
  };
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
          onClick={() => navigate("/")}
        >
          선택한 위치로 설정
        </div>
      </div>
    </div>
  );
}

export default Location;
