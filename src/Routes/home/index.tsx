import { useEffect, useState } from "react";
import Map from "../maps";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation } from "../../core/location-provider";
import { gql } from "../../__generated__";
import { gql as apolloGql } from "@apollo/client";
import { useAuth } from "../../core/auth";
import { Product, Store } from "../../__generated__/graphql";
import BottomTab from "../../components/bottom-tab";
import { StoreCard } from "../../components/store_card";
import { NoStore } from "../../components/home/no-store";
import { useCart } from "../../core/cart";
import { track } from "@amplitude/analytics-browser";
import Skeleton from "react-loading-skeleton";

const GET_STORES = gql(`
  query Stores($lat: Float, $lng: Float) {
    stores(lat: $lat, lng: $lng) {
      id
      lat
      lng
      title
      createdAt
      updatedAt
      isLiked
      distance
      products {
        id
        price
        discountPrice
        saleEndTime
        quantity
        createdAt
        updatedAt
      }
      todaysProducts {
        id
        price
        discountPrice
        userPrice
        saleEndTime
        quantity
        createdAt
        updatedAt
      }
      img
      contactNumber
      closingHours
    }
  }
`);
const JUST_STORES = gql(`
query JustStores {
  justStores {
    id
    lat
    lng
    title
    createdAt
    updatedAt
    isLiked
    products {
      id
      price
      discountPrice
      saleEndTime
      quantity
      createdAt
      updatedAt
    }
    todaysProducts {
      id
      price
      discountPrice
      userPrice
      saleEndTime
      quantity
      createdAt
      updatedAt
    }
    address
    img
    contactNumber
    closingHours
  }
}
`);
export const LIKE_STORE = apolloGql`
  mutation LikeStore($storeId: Int!) {
    likeStore(storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`;
export const CANCEL_LIKE = apolloGql`
  mutation CancelLike($storeId: Int!) {
    cancelLike(storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`;
const Home = () => {
  const { cart } = useCart();
  const { isLoggedIn } = useAuth();
  const [isList, setIsList] = useState(true);
  const { hasLastLo, getLocationFromStorage } = useLocation();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_STORES, {
    variables: {
      lat: hasLastLo ? getLocationFromStorage().lat : null,
      lng: hasLastLo ? getLocationFromStorage().lng : null,
    },
    // onCompleted: (data) => console.log(data),
    fetchPolicy: "no-cache",
  });
  const { data: justData } = useQuery(JUST_STORES, {
    // onCompleted: (data) => console.log(data),
    fetchPolicy: "network-only",
  });
  const [likeStore] = useMutation(LIKE_STORE, {
    onCompleted: (data) => {
      // console.log(data);
    },
    onError: (error) => console.error(error),
    refetchQueries: [
      {
        query: GET_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
        },
      },
      {
        query: JUST_STORES,
      },
    ],
  });
  const [cancelLike] = useMutation(CANCEL_LIKE, {
    onError: (error) => console.error(error),
    refetchQueries: [
      // 흠... 이거 캐시로 수정해야해 ㅠㅠ 일단 이렇게 하긴하는데 불필요한 네트워크 요청이 넘 만을 것 같다. 이거부터 청산해야할 듯. 출시후에
      {
        query: GET_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
        },
      },
      {
        query: JUST_STORES,
      },
    ],
  });
  function onClickTab(type: string) {
    if (type === "LIST") {
      setIsList(true);
    } else {
      setIsList(false);
    }
  }
  async function onClickLike(storeId: number, isLiked: boolean | null) {
    if (!isLoggedIn) {
      navigate("/login");
      return;
      // TODO: 로그인 페이지로 보낸다.
    }
    // 토글처리
    if (isLiked) {
      // deleteLike
      cancelLike({
        variables: {
          storeId,
        },
      });
    } else {
      // createLike
      likeStore({
        variables: {
          storeId,
        },
      });
    }
  }
  function onClickStore(store: Store) {
    track("매장 클릭", {
      매장명: store.title,
    });
    navigate(`store/${store.id}`);
  }
  function onClickCart() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }

  return (
    <div className="w-full h-[100vh] flex flex-col bg-white">
      {/* LOCATION */}
      <div className="py-3 pl-5 bg-white flex items-center cursor-pointer justify-between">
        <div className="flex" onClick={() => navigate("/location")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M15.4499 14.5749L11.7373 18.2875C11.5749 18.45 11.3821 18.5789 11.1699 18.6669C10.9576 18.7549 10.7302 18.8002 10.5004 18.8002C10.2707 18.8002 10.0432 18.7549 9.83101 18.6669C9.61879 18.5789 9.42599 18.45 9.26363 18.2875L5.55013 14.5749C4.5712 13.5959 3.90455 12.3486 3.63448 10.9907C3.36441 9.63289 3.50306 8.22544 4.03288 6.94638C4.5627 5.66732 5.45991 4.57409 6.61105 3.80493C7.76219 3.03578 9.11555 2.62524 10.5 2.62524C11.8845 2.62524 13.2378 3.03578 14.389 3.80493C15.5401 4.57409 16.4373 5.66732 16.9671 6.94638C17.4969 8.22544 17.6356 9.63289 17.3655 10.9907C17.0955 12.3486 16.4288 13.5959 15.4499 14.5749Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.125 9.625C13.125 10.3212 12.8484 10.9889 12.3562 11.4812C11.8639 11.9734 11.1962 12.25 10.5 12.25C9.80381 12.25 9.13613 11.9734 8.64384 11.4812C8.15156 10.9889 7.875 10.3212 7.875 9.625C7.875 8.92881 8.15156 8.26113 8.64384 7.76884C9.13613 7.27656 9.80381 7 10.5 7C11.1962 7 11.8639 7.27656 12.3562 7.76884C12.8484 8.26113 13.125 8.92881 13.125 9.625Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="ml-1 text-black font-semibold text-md">
            {localStorage.getItem("loadAddr") || "내 위치를 설정해주세요."}
          </span>
        </div>
        <div className="relative inline-block mr-5 mt-1" onClick={onClickCart}>
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6h15l-1.5 9h-13L6 6z"></path>
            <circle cx="9" cy="20" r="1"></circle>
            <circle cx="18" cy="20" r="1"></circle>
            <path d="M6 6L4 2"></path>
          </svg>

          {/* Number Badge */}
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            {cart.length}
          </div>
        </div>
      </div>

      <div className="h-[0.0625rem] w-full bg-[#7a7a7a]" />
      {/* TAB */}
      <div className="">
        <div className="flex justify-center">
          <div
            className={`w-[50%] text-center py-4 text-lg font-bold cursor-pointer ${
              isList
                ? "bg-[#fff] text-[#000]"
                : "bg-[#F4F5F7] text-[#BBBDC0] font-normal"
            } `}
            onClick={() => onClickTab("LIST")}
          >
            리스트 둘러보기
          </div>
          <div
            className={`w-[50%] text-center py-4 text-lg font-bold cursor-pointer ${
              !isList
                ? "bg-[#fff] text-[#000]"
                : "bg-[#F4F5F7] text-[#BBBDC0] font-normal"
            } `}
            onClick={() => onClickTab("MAP")}
          >
            지도로 찾아보기
          </div>
        </div>
      </div>
      <div className="h-[0.0625rem] w-full bg-[#F4F5F7]" />

      {/* LIST */}

      {!isList && data && data.stores ? (
        <Map stores={justData?.justStores as Store[]} />
      ) : null}
      {loading ? (
        <div className="pt-8 px-4 z-0">
          <Skeleton
            count={3}
            style={{ height: 208, marginBottom: 16 }}
            borderRadius={"10px"}
          />
        </div>
      ) : null}
      {isList ? (
        data?.stores?.length !== 0 ? (
          <div className="pt-8 mb-16 p-4 pb-8 flex-1 overflow-y-auto">
            {data?.stores?.map((store) => (
              <div className="mb-4">
                <StoreCard
                  title={store?.title as string}
                  quantity={store?.todaysProducts?.reduce((total, product) => {
                    return total + product.quantity;
                  }, 0)}
                  closingHours={store?.closingHours as string}
                  discountPrice={
                    (store?.todaysProducts as Product[])[0]?.userPrice
                  }
                  price={(store?.todaysProducts as Product[])[0]?.price}
                  isLiked={store?.isLiked}
                  distance={store?.distance}
                  img={store?.img as string}
                  onClick={() => onClickStore(store as Store)}
                  onClickHeart={async (e) => {
                    e.stopPropagation(); // Prevents triggering the store click
                    await onClickLike(
                      store?.id as number,
                      store?.isLiked as boolean
                    );
                  }}
                />
              </div>
            ))}
            <div className="mx-auto w-32 h-10 mt-8 bg-white rounded-md border border-solid shadow-lg border-[#dddddd] flex justify-center items-center cursor-pointer">
              <a
                href="https://forms.gle/PXmEvzq4LsNDC1Gj9"
                className="text-[#5b5b5b] text-sm font-semibold"
              >
                매장 추천하기
              </a>
            </div>
          </div>
        ) : (
          <NoStore />
        )
      ) : null}

      {/* BOTTOM TAB */}
      <BottomTab />
      <img
        className="fixed bottom-0 z-0 w-[42px] h-[42px]"
        src="https://waasrzvnijhadqtenzsq.supabase.co/storage/v1/object/public/product/3x_map-marker.png"
        alt="Custom Marker1"
      />
      <img
        className="fixed bottom-0 z-0 w-[42px] h-[42px]"
        src="https://waasrzvnijhadqtenzsq.supabase.co/storage/v1/object/public/product/marker.png"
        alt="Custom Marker2"
      />
    </div>
  );
};

export default Home;
