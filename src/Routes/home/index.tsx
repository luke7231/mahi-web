import { useState } from "react";
import { DATA } from "../../data";
import Map from "../maps";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation } from "../../core/location-provider";
import { gql } from "../../__generated__";
import { gql as apolloGql } from "@apollo/client";
import { useAuth } from "../../core/auth";
import { client } from "../../App";
import { Store } from "../../__generated__/graphql";
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
const LIKE_STORE = apolloGql`
  mutation LikeStore($userId: Int!, $storeId: Int!) {
    likeStore(userId: $userId, storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`;
const CANCEL_LIKE = apolloGql`
  mutation CancelLike($userId: Int!, $storeId: Int!) {
    cancelLike(userId: $userId, storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`;
const Home = () => {
  const { isLoggedIn } = useAuth();
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
    fetchPolicy: "network-only",
  });
  const [likeStore] = useMutation(LIKE_STORE, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.error(error),
    refetchQueries: [
      {
        query: GET_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
          userId: 1,
        },
      },
    ],
  });
  const [cancelLike] = useMutation(CANCEL_LIKE, {
    onCompleted: (data) => {
      console.log(data.cancelLike.storeId, "id..");
    },
    onError: (error) => console.error(error),
    refetchQueries: [
      {
        query: GET_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
          userId: 1,
        },
      },
    ],
  });
  // const updateCacheAfterLikeOrCancelLike = (
  //   storeId: number,
  //   isLiked: boolean
  // ) => {
  //   client.cache.modify({
  //     // id: String(storeId),
  //     id: client.cache.identify()
  //     fields: {
  //       stores(existingStores = []) {
  //         return existingStores.map((store: any) => {
  //           if (store.__ref === `Store: ${storeId}`) {
  //             return { ...store, isLiked };
  //           }
  //           return store;
  //         });
  //       },
  //     },
  //   });
  //   const cachedStores = client.cache.readQuery({
  //     query: GET_STORES,
  //     variables: {
  //       lat: hasLastLo ? getLocationFromStorage().lat : null,
  //       lng: hasLastLo ? getLocationFromStorage().lng : null,
  //       userId: 1,
  //     },
  //   });

  //   console.log("Updated cache:", cachedStores);
  // };
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
  async function onClickLike(storeId: number, isLiked: boolean | null) {
    // if (!isLoggedIn) {
    //   //
    //   return;
    //   // TODO: 로그인 페이지로 보낸다.
    // }
    // 토글처리
    if (isLiked) {
      // deleteLike
      cancelLike({
        variables: {
          userId: 1, //  내 아이디로 !!
          storeId,
        },
      });
    } else {
      // createLike
      likeStore({
        variables: {
          userId: 1, //  내  아이디로!!
          storeId,
        },
      });
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
                <div
                  onClick={async () => {
                    await onClickLike(
                      store?.id as number,
                      store?.isLiked as boolean | null // login 안했으면 null 일 수 있어서 일단 넣어놓음.
                    );
                  }}
                >
                  {store?.isLiked ? "❤️" : "🤍"}
                </div>
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
