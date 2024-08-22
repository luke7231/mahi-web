import React, { useEffect, useState } from "react";
import { postMessage } from "../../core/message";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { useLocation } from "../../core/location-provider";
import BottomTab from "../../components/bottom-tab";
const GET_LIKED_STORES = gql(`
  query LikedStores {
    likedStores {
      id
      lat
      lng
      title
      createdAt
      updatedAt
      isLiked
    }
  }
`);
const LIKE_STORE = gql(`
  mutation LikeStore($storeId: Int!) {
    likeStore(storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`);
const CANCEL_LIKE = gql(`
  mutation CancelLike($storeId: Int!) {
    cancelLike(storeId: $storeId) {
      id
      userId
      storeId
      createdAt
    }
  }
`);
const Like = () => {
  const { hasLastLo, getLocationFromStorage } = useLocation();
  const { data, loading, error } = useQuery(GET_LIKED_STORES, {
    fetchPolicy: "network-only",
  });
  const [likeStore] = useMutation(LIKE_STORE, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.error(error),
    refetchQueries: [
      {
        query: GET_LIKED_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
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
      // 흠... 이거 캐시로 수정해야해 ㅠㅠ 일단 이렇게 하긴하는데 불필요한 네트워크 요청이 넘 만을 것 같다. 이거부터 청산해야할 듯. 출시후에
      {
        query: GET_LIKED_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
        },
      },
    ],
  });
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

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <div className="mt-8 pl-4 pr-4">
        {loading ? <div>loading...</div> : null}
        {data?.likedStores?.length === 0 ? (
          <div>좋아요한 매장이 빵 개 입니다.</div>
        ) : null}
        {data?.likedStores?.map((store) => {
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
      <BottomTab />
    </div>
  );
};

export default Like;
