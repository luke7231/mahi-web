import React, { useEffect, useState } from "react";
import { postMessage } from "../../core/message";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { useLocation } from "../../core/location-provider";
import BottomTab from "../../components/bottom-tab";
import { StoreCard } from "../../components/store_card";
import { Product } from "../../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import NoLikedStore from "../../components/home/no-liked-store";
import Header from "../../components/common/header";
import LoadingSpinner from "../../components/loading-spinnere";
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
      products {
        id
        price
        discountPrice
        saleEndTime
        quantity
        createdAt
        updatedAt
      }
      img
      closingHours
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
  const navigate = useNavigate();
  const { hasLastLo, getLocationFromStorage } = useLocation();
  const { data, loading, error } = useQuery(GET_LIKED_STORES, {
    fetchPolicy: "cache-and-network",
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
  function onClickStore(id: number) {
    navigate(`/store/${id}`);
  }
  async function onClickLike(storeId: number, isLiked: boolean | null) {
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
      <Header title="관심매장" />
      {data?.likedStores?.length === 0 ? <NoLikedStore /> : null}
      <div className="pl-4 pr-4 mt-4 pb-16 overflow-y-auto">
        {/* {loading ? (
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence"></div>
            <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence animation-delay-200"></div>
            <div className="w-3 h-3 bg-[#1562fc] rounded-full animate-bounce-sequence animation-delay-400"></div>
          </div>
        ) : null} */}
        {data?.likedStores?.map((store) => {
          return (
            <div className="mb-4">
              <StoreCard
                title={store?.title as string}
                quantity={store?.products?.reduce((total, product) => {
                  return total + product.quantity;
                }, 0)}
                closingHours={store?.closingHours as string}
                discountPrice={
                  (store?.products as Product[])[0]?.discountPrice as number
                }
                price={(store?.products as Product[])[0]?.price}
                isLiked={store?.isLiked}
                img={store?.img as string}
                onClick={() => onClickStore(store?.id as number)}
                onClickHeart={async (e) => {
                  e.stopPropagation(); // Prevents triggering the store click
                  await onClickLike(
                    store?.id as number,
                    store?.isLiked as boolean
                  );
                }}
              />
            </div>
          );
        })}
      </div>
      <BottomTab />
    </div>
  );
};

export default Like;
