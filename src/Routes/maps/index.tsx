import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomMapMarker from "../../components/custom-map-marker";
import { useNavigate } from "react-router-dom";
import { DATA, IData } from "../../data";

function Map() {
  const navigate = useNavigate();
  const mapElement = useRef<HTMLDivElement | null>(null);
  // const [searchKeyword, setSearchKeyword] = useState(
  //   "안성시 공도읍 서동대로 4060-5, 효성해링턴플레이스 202동 306호 "
  // );
  const [AddressY, setAddressY] = useState<number>(37.3595704);
  const [AddressX, setAddressX] = useState<number>(127.105399);

  // useEffect(() => {
  //   if (searchKeyword) {
  //     naver.maps.Service?.geocode(
  //       { query: searchKeyword },
  //       function (status, res) {
  //         if (res.v2.addresses.length === 0) {
  //           // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
  //           console.log("hi");
  //         } else {
  //           console.log("hi");
  //           // 요청 성공에 대한 핸들링
  //           // 검색된 주소에 해당하는 위도, 경도를 숫자로 변환후 상태 저장
  //           const resAddress = res.v2.addresses[0];
  //           const x = parseFloat(resAddress.x);
  //           const y = parseFloat(resAddress.y);
  //           setAddressX(x);
  //           setAddressY(y);
  //         }
  //       }
  //     );
  //   }
  // }, [searchKeyword]);

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
      zoom: 12,
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
    addMarkers();
    //검색 결과 거리순으로 재정렬하는 함수 호출
    resetListHandler();
    // }, [AddressX, AddressY, totalDomData, viewportWidth]);
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

  const [sortedData, setSortedData] = useState<IData[] | []>();

  const resetListHandler = () => {
    if (!newMap) return;

    // 미터 실험
    // const tA = newMap.getCenter();
    // console.log(tA);
    // const test1 = DATA[0];
    // const tA = new naver.maps.LatLng(test1.lat, test1.lng);
    // const test = DATA[4];
    // const tB = new naver.maps.LatLng(test.lat, test.lng);
    // console.log(tB);
    // const projection = newMap.getProjection();
    // const dis = projection.getDistance(tA, tB);

    const newArray = [...DATA].sort((a, b) => {
      const currentCenterLatLng = newMap.getCenter();
      const LatLngA = new naver.maps.LatLng(a.lng, a.lat);
      const LatLngB = new naver.maps.LatLng(b.lng, b.lat);
      const projection = newMap.getProjection();
      const distanceA = projection.getDistance(currentCenterLatLng, LatLngA);
      const distanceB = projection.getDistance(currentCenterLatLng, LatLngB); // 미터 단위

      if (distanceA < distanceB) return -1;
      else if (distanceA > distanceB) return 1;
      else return 0;
    });

    setSortedData(newArray);
  };

  useEffect(() => {
    resetListHandler();
  }, [newMap]);

  const clickButton = () => {
    // 원래 자리로 옮기는 것
    // newMap?.panTo(new naver.maps.LatLng(37.3595704, 127.105399), {
    //   duration: 0,
    // });
    resetListHandler();
    console.log("내 현재 위치로 돌아오면서 재 정렬한다?");
  };
  return (
    <div className="w-[100%]">
      <div
        ref={mapElement}
        id="map"
        style={{ width: "100%", height: "400px" }}
      ></div>
      <div className="flex items-center justify-center">
        <div>
          <div
            className="bg-orange-400 p-2 rounded-md mt-4"
            // onClick={() => clickButton()}
            onClick={() => window.location.reload()}
          >
            reload
          </div>
          <div
            className="bg-orange-400 p-2 rounded-md mt-4"
            // onClick={() => clickButton()}
            onClick={() => navigate("/like")}
          >
            go to like
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
