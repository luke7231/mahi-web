import { useDaumPostcodePopup } from "react-daum-postcode";
import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/loading-spinnere";
import CustomMapMarker2 from "../../../components/custome-map-marker2";
import Header from "../../../components/common/header";

// GraphQL Query to fetch seller's store
export const GET_SELLER_STORE = gql`
  query GetSellerStore {
    getSellerStore {
      id
      title
      address
      contactNumber
      closingHours
      lng
      lat
      img
    }
  }
`;

// GraphQL Mutation to update store information
const UPDATE_STORE = gql`
  mutation UpdateStore(
    $id: Int!
    $title: String
    $lat: Float
    $lng: Float
    $address: String
    $contactNumber: String
    $closingHours: String
    $img: Upload
  ) {
    updateStore(
      id: $id
      title: $title
      lat: $lat
      lng: $lng
      address: $address
      contactNumber: $contactNumber
      closingHours: $closingHours
      img: $img
    ) {
      id
      title
      address
      contactNumber
      closingHours
    }
  }
`;

// GraphQL Mutation to create a store
const CREATE_STORE = gql`
  mutation CreateStore(
    $lat: Float
    $lng: Float
    $title: String!
    $address: String
    $contactNumber: String
    $closingHours: String
    $img: Upload
  ) {
    createStore(
      lat: $lat
      lng: $lng
      title: $title
      address: $address
      contactNumber: $contactNumber
      closingHours: $closingHours
      img: $img
    ) {
      ok
      error
    }
  }
`;

const GET_COORDS = gql`
  query GetCoords($address: String!) {
    getCoords(address: $address) {
      lat
      lng
    }
  }
`;

type Store = {
  id: number;
  img?: string;
  title: string;
  address: string;
  contactNumber: string;
  closingHours: string;
  lat: number;
  lng: number;
};

const StoreManagement: React.FC = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [imgFile, setImgFile] = useState<File | null>(null); // 이미지 파일 상태 추가

  // Fetch seller's store using Apollo Client's useQuery hook
  const { loading, error, data } = useQuery(GET_SELLER_STORE, {
    onCompleted: (data) => {
      setStore(data.getSellerStore);
      setLat(data.getSellerStore.lat);
      setLng(data.getSellerStore.lng);
    },
  });
  const [updateStore] = useMutation(UPDATE_STORE);
  const [createStore] = useMutation(CREATE_STORE);

  const handleAddStore = () => {
    setIsEditing(true);
  };

  const handleSaveStore = (storeInfo: Store) => {
    if (store) {
      updateStore({
        variables: {
          id: store.id, // Store ID를 기반으로 업데이트
          title: storeInfo.title,
          address: storeInfo.address,
          contactNumber: storeInfo.contactNumber,
          closingHours: storeInfo.closingHours,
          lat,
          lng,
          img: imgFile, // 이미지 파일 전달
        },
      }).then(() => {
        setStore(storeInfo);
        setIsEditing(false);
      });
    } else {
      // Create new store
      createStore({
        variables: {
          title: storeInfo.title,
          address: storeInfo.address,
          contactNumber: storeInfo.contactNumber,
          closingHours: storeInfo.closingHours,
          lat,
          lng,
          img: imgFile, // 이미지 파일 전달
        },
      }).then((response) => {
        setStore(response.data.createStore);
        setIsEditing(false);
      });
    }
  };
  const handleOpenModal = () => setIsModalOpen(true); // 모달 열기
  const handleCloseModal = () => setIsModalOpen(false); // 모달 닫기

  const handleSelectAddress = (lng: number, lat: number) => {
    setLng(lng);
    setLat(lat);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file); // 파일을 상태에 저장
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!store && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
        <Header title="매장정보" showBackButton />
        <p className="text-lg mb-6 text-gray-700 mt-12">
          매장을 등록해보세요!!
        </p>
        <button
          onClick={handleAddStore}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          매장 추가하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="매장정보" showBackButton />
      <div className="p-6">
        {isEditing ? (
          <StoreEditForm
            onSave={handleSaveStore}
            handleOpenModal={handleOpenModal}
            onCancel={() => setIsEditing(false)}
            store={store}
            setLng={setLng}
            setLat={setLat}
            lng={lng}
            lat={lat}
            handleImageChange={handleImageChange} // 이미지 파일 핸들러 전달
          />
        ) : (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {store?.img && (
              <div className="mb-6">
                <img
                  src={store.img}
                  alt={`${store?.title} 매장 이미지`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            <div className="mb-4">
              <p className="font-bold  text-gray-900 text-md mb-1">매장이름</p>
              <p className="text-black">{store?.title}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold  text-gray-900 text-md mb-1">주소</p>
              <p className="text-black">{store?.address}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold  text-gray-900 text-md mb-1">연락처</p>
              <p className="text-black">{store?.contactNumber}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold  text-gray-900 text-md mb-1">영업 시간</p>
              <p className="text-black">~ {store?.closingHours}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              매장 정보 수정
            </button>
          </div>
        )}
        {lat && lng && isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white py-6 rounded-lg shadow-lg w-[80%]">
              <h2 className="text-xl font-bold mb-4">상세 주소 선택</h2>
              <Map onSelectAddress={handleSelectAddress} lng={lng} lat={lat} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 매장 수정 폼 컴포넌트
type StoreEditFormProps = {
  onSave: (storeInfo: Store) => void;
  onCancel: () => void;
  store: Store | null;
  handleOpenModal: () => void;
  setLng: (data: number) => void;
  setLat: (data: number) => void;
  lng: number;
  lat: number;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이미지 파일 핸들러 추가
};

const StoreEditForm: React.FC<StoreEditFormProps> = ({
  onSave,
  handleOpenModal,
  onCancel,
  store,
  setLng,
  setLat,
  lng,
  lat,
  handleImageChange, // 이미지 파일 핸들러 추가
}) => {
  const [title, setTitle] = useState(store?.title || "");
  const [address, setAddress] = useState(store?.address || "");
  const [contactNumber, setContactNumber] = useState(
    store?.contactNumber || ""
  );
  const [closingHours, setClosingHours] = useState(store?.closingHours || "");
  const [getCoordsFromAddress] = useLazyQuery(GET_COORDS);

  const handleSubmit = () => {
    onSave({
      id: store?.id || 0,
      title,
      address,
      contactNumber,
      closingHours,
      lng,
      lat,
    });
  };

  const openPostCode = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;

    setAddress(fullAddress);
    getCoordsFromAddress({
      variables: {
        address: fullAddress,
      },
    }).then((response) => {
      setLng(response.data.getCoords.lng);
      setLat(response.data.getCoords.lat);
    });
  };

  const handleAddressClick = () => {
    openPostCode({ onComplete: handleAddressComplete });
  };

  const handleSpecificAddressClick = () => {
    // location modal open
    handleOpenModal();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">매장 정보 수정</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">매장 이름</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">매장 주소</label>
        <div
          onClick={handleAddressClick}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        >
          {address}
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <label className="block text-gray-700 font-semibold">
          상세 주소 등록
        </label>
        <div className="flex gap-2">
          <div
            onClick={handleSpecificAddressClick}
            className="text-blue-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
          >
            {lat && lng ? "완료(재설정)" : "클릭"}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">연락처</label>
        <input
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <label className="block text-gray-700 font-semibold">
            영업 종료 시간
          </label>
          <span className="text-gray-500 text-sm">(ex. 21:00)</span>
        </div>
        <input
          value={closingHours}
          onChange={(e) => setClosingHours(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">매장 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange} // 이미지 파일 변경 핸들러
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default StoreManagement;

const Map = ({
  onSelectAddress,
  lat,
  lng,
}: {
  onSelectAddress: (lat: number, lng: number) => void;
  lng: number;
  lat: number;
}) => {
  const [loading, setLoading] = useState(false);
  const mapElement = useRef<HTMLDivElement | null>(null);

  const { naver } = window;
  let map: naver.maps.Map;
  // 지도가 이동하였을 때 가려진 부분의 마커는 숨기고
  // 노출된 부분의 마커를 표시하는 작업을 하기 위해 map 인스턴스를 state로 관리
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);
  const [newMarker, setNewMarker] = useState<naver.maps.Marker | null>(null);

  const center = new naver.maps.LatLng(lat, lng);
  // [지도를 그리는 effect]
  useEffect(() => {
    if (!mapElement.current || !naver) {
      return;
    }

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

    // WEB
    // newMap?.panTo(new naver.maps.LatLng(36.99502164866016, 127.1596148737739), {
    //   // 안성
    //   duration: 0,
    // });

    // // TODO: 센터 마커도 같이 이동해야함.
    // newMarker?.setPosition(
    //   new naver.maps.LatLng(36.99502164866016, 127.1596148737739) // 안성
    // );
    // newMarker?.setMap(newMap);
  };

  function onClickClose() {
    const center = newMap?.getCenter();

    const lat = center?.y as number;
    const lng = center?.x as number;
    onSelectAddress(lng, lat);
  }
  return (
    <div className="w-[100%] h-[400px]">
      {loading ? <LoadingSpinner /> : null}
      <div
        ref={mapElement}
        id="map"
        style={{ width: "100%", height: 420 }}
      ></div>
      <button
        onClick={() => onClickClose()}
        className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
      >
        완료
      </button>
    </div>
  );
};
