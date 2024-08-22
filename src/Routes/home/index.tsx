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
import BottomTab from "../../components/bottom-tab";
// localStorage.clear();
const GET_STORES = gql(`
  query Stores($lat: Float, $lng: Float) {
    stores(lat: $lat, lng: $lng) {
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
        query: GET_STORES,
        variables: {
          lat: hasLastLo ? getLocationFromStorage().lat : null,
          lng: hasLastLo ? getLocationFromStorage().lng : null,
          userId: 1,
        },
      },
    ],
  });
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
  function onClickStore(id: number) {
    navigate(`store/${id}`);
  }
  return (
    <div className="w-full h-[100vh] flex flex-col bg-white">
      {/* LOCATION */}
      <div
        className="p-2 bg-gray-100 flex justify-center items-center cursor-pointer border-b border-gray-300"
        onClick={() => navigate("/location")}
      >
        <span className="text-blue-500 font-bold underline">
          📍 내 위치를 설정해주세요.
        </span>
      </div>

      {/* <div className="p-2 text-sm text-gray-600">
        <span className="cursor-pointer" onClick={() => localStorage.clear()}>
          token:
        </span>{" "}
        {localStorage.getItem("expo_push_token")}
      </div> */}

      {/* TAB */}
      <div className="px-6 mt-8 ">
        <div className="flex justify-center rounded-lg shadow-md">
          <div
            className={`w-[50%] text-center p-4 text-xl font-bold cursor-pointer ${
              isList ? "bg-gray-800 text-white" : "bg-gray-200"
            } rounded-l-xl`}
            onClick={() => onClickTab("LIST")}
          >
            리스트
          </div>
          <div
            className={`w-[50%] text-center p-4 text-xl font-bold cursor-pointer ${
              !isList ? "bg-gray-800 text-white" : "bg-gray-200"
            } rounded-r-xl`}
            onClick={() => onClickTab("MAP")}
          >
            지도
          </div>
        </div>
      </div>

      {/* LIST */}
      {isList ? (
        <div className="mt-8 px-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            data?.stores?.map((store) => (
              <div
                key={store?.id}
                className="h-[120px] shadow-md mb-4 flex items-center p-4 bg-gray-50 rounded-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onClickStore(store?.id as number)}
              >
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800">
                    {store?.title}
                  </div>
                </div>
                <div
                  className="text-2xl"
                  onClick={async (e) => {
                    e.stopPropagation(); // Prevents triggering the store click
                    await onClickLike(
                      store?.id as number,
                      store?.isLiked as boolean
                    );
                  }}
                >
                  {store?.isLiked ? "❤️" : "🤍"}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <Map stores={data?.stores as Store[]} />
      )}

      {/* BOTTOM TAB */}
      <BottomTab />
    </div>
  );
};

export default Home;
