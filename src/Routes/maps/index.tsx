import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomMapMarker from "../../components/custom-map-marker";
import { useNavigate } from "react-router-dom";
import { DATA, IData } from "../../data";
import { Product, Store } from "../../__generated__/graphql";
import { StoreCard } from "../../components/store_card";
import { useAuth } from "../../core/auth";

function getAddressY() {
  return localStorage.getItem("lat");
}
function getAddressX() {
  return localStorage.getItem("lng");
}
function Map({ stores }: { stores: Store[] }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [AddressY, setAddressY] = useState<number>(
    Number(getAddressY()) || 37.3595704
  );
  const [AddressX, setAddressX] = useState<number>(
    Number(getAddressX()) || 127.105399
  );
  const [clickedStore, setClickedStore] = useState<Store | null>(null);
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
  }, [stores, AddressX, AddressY]);

  //마커를 담을 배열
  const createMarkerList: naver.maps.Marker[] = [];

  // [반복문을 통해 데이터 배열 순회하면서 마커 생성 진행하는 함수]
  const addMarkers = () => {
    for (let i = 0; i < stores.length; i++) {
      let markerObj = stores[i];
      addMarker(markerObj);
    }
  };

  // [마커를 배열에 추가하는 함수]
  const addMarker = (store: Store) => {
    const { id, title, lat, lng } = store;
    try {
      let newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat as number, lng as number),
        map,
        title,
        clickable: true,
        // [마커 커스터마이징]
        icon: {
          //html element를 반환하는 CustomMapMarker 컴포넌트 할당
          content: CustomMapMarker(),
          //마커의 크기 지정
          size: new naver.maps.Size(38, 58),
          //마커의 기준위치 지정
          anchor: new naver.maps.Point(10, 30),
        },
      });
      newMarker.setTitle(title);
      newMarker.addListener("click", () => {
        setClickedStore(store);
      });
      //마커리스트에 추가
      createMarkerList.push(newMarker);
    } catch (e) {}
  };

  const [sortedData, setSortedData] = useState<IData[] | []>();

  const resetListHandler = () => {
    if (!newMap) return;

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

  async function onClickLike(storeId: number, isLiked: boolean | null) {
    if (!isLoggedIn) {
      navigate("/login");
      return;
      // TODO: 로그인 페이지로 보낸다.
    }
    // 토글처리
    if (isLiked) {
      // deleteLike
      // cancelLike({
      //   variables: {
      //     storeId,
      //   },
      // });
    } else {
      // createLike
      // likeStore({
      //   variables: {
      //     storeId,
      //   },
      // });
    }
  }
  function onClickStore(id: number) {
    navigate(`/store/${id}`);
  }
  const clickButton = () => {
    // 원래 자리로 옮기는 것
    // newMap?.panTo(new naver.maps.LatLng(37.3595704, 127.105399), {
    //   duration: 0,
    // });
    resetListHandler();
    console.log("내 현재 위치로 돌아오면서 재 정렬한다?");
  };
  const mapHeight = window.innerHeight - 45 - 56 - 64; // 1. 위치설정 바 2. 탭 3. 바텀탭
  return (
    <div className="w-[100%]">
      <div
        ref={mapElement}
        id="map"
        style={{ width: "100%", height: `${mapHeight}px` }}
      >
        {clickedStore ? (
          <div className="p-4 absolute bottom-1 z-50 w-full ">
            <div className="shadow-[0px_0px_144px_0px_rgba(21,98,252,0.40)]">
              <StoreCard
                title={clickedStore?.title as string}
                quantity={clickedStore?.todaysProducts?.reduce(
                  (total, product) => {
                    return total + product.quantity;
                  },
                  0
                )}
                closingHours={clickedStore?.closingHours as string}
                discountPrice={
                  (clickedStore?.todaysProducts as Product[])[0]
                    ?.userPrice as number
                }
                price={(clickedStore?.todaysProducts as Product[])[0]?.price}
                isLiked={clickedStore?.isLiked}
                img={clickedStore?.img as string}
                onClick={() => onClickStore(clickedStore?.id as number)}
                onClickHeart={async (e) => {
                  e.stopPropagation(); // Prevents triggering the clickedStore click
                  await onClickLike(
                    clickedStore?.id as number,
                    clickedStore?.isLiked as boolean
                  );
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center">
        <div>
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Map;
