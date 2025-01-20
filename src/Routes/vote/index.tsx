import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import TransitionWrapper from "../../components/common/transition-wrapper";
import FadeInWrapper from "../../components/fade-in-wrapper";
import VoteBottomSheet from "./vote-bottom-sheet";
import { UncontractedStore } from "../../__generated__/graphql";
import { useAuth } from "../../core/auth";
import { useNavigate } from "react-router-dom";

// GraphQL 쿼리 정의
const GET_UNCONTRACTED_STORES = gql`
  query GetUncontractedStores {
    getUncontractedStores {
      id
      name
      img
      mainMenuImg1
      mainMenuImg2
      priceRange
      createdAt
      updatedAt
      voteCount
      isVoted
    }
  }
`;

const VOTE_FOR_STORES = gql`
  mutation VoteForStores($uncontractedStoreIds: [Int!]!) {
    voteForStores(uncontractedStoreIds: $uncontractedStoreIds) {
      id
      user {
        id
      }
      uncontractedStore {
        id
        name
      }
    }
  }
`;

const VotePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  // GraphQL 쿼리 실행
  const { loading, error, data } = useQuery(GET_UNCONTRACTED_STORES);

  const [voteForStores] = useMutation(VOTE_FOR_STORES);

  const handleStoreClick = (store: { id: number; name: string }) => {
    setChecklist((prev) => {
      if (prev.some((item) => item.id === store.id)) {
        return prev.filter((item) => item.id !== store.id);
      } else {
        return [...prev, { id: store.id, name: store.name }];
      }
    });
  };

  const handleVoteClick = () => {
    if (isLoggedIn) {
      setBottomSheetOpen(true);
    } else {
      localStorage.setItem("redirect", window.location.pathname);
      navigate("/login");
    }
  };

  const handleVoteConfirmClick = async () => {
    try {
      const { data } = await voteForStores({
        variables: {
          uncontractedStoreIds: checklist.map((store) => store.id),
        },
      });
      setBottomSheetOpen(false);
      navigate("/vote-completed");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white min-h-screen p-4">
      <FadeInWrapper>
        <h1 className="text-3xl text-black font-extrabold mt-4">
          <span className="text-[#1692fc]">백현동</span>에서 추천하고 싶은
        </h1>
        <h1 className="text-2xl text-black font-bold mb-6">
          매장을 투표해보세요!
        </h1>
      </FadeInWrapper>
      <p className="text-md text-gray-400 font-bold mb-4 text-center">
        이 투표는 백현동 한정 진행되는 이벤트입니다!
      </p>

      {data.getUncontractedStores.map(
        (store: UncontractedStore, index: number) => (
          <div className="w-full h-full mb-6" key={store.id}>
            <StoreCard
              title={store.name}
              onClick={() =>
                handleStoreClick({ id: store.id, name: store.name })
              }
              img={store.img || ""}
              mainMemuImg1={store.mainMenuImg1 || ""}
              mainMemuImg2={store.mainMenuImg2 || ""}
              voteCount={store.voteCount}
              isVoted={store.isVoted || false}
            />
          </div>
        )
      )}
      <button
        className="fixed bottom-4 z-50 left-1/2 transform -translate-x-1/2 bg-[#1692fc] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#1177cc] transition-all duration-200 w-[calc(100%-2rem)] max-w-[90%]"
        onClick={handleVoteClick}
      >
        투표하기
      </button>
      <VoteBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onButtonClick={handleVoteConfirmClick}
        checklist={checklist}
      />
    </div>
  );
};

export default VotePage;

interface IProp {
  onClick: () => void;
  title: string;
  img: string;
  mainMemuImg1?: string;
  mainMemuImg2?: string;
}

export const StoreCard = ({
  title,
  onClick,
  img,
  mainMemuImg1,
  mainMemuImg2,
  voteCount,
  isVoted,
}: IProp & { voteCount: number; isVoted: boolean }): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    if (!isVoted) {
      setIsSelected(!isSelected);
      onClick();
    }
  };

  return (
    <TransitionWrapper
      scale={0.9}
      opacity={0.8}
      className="w-full h-64"
      onClick={handleCardClick}
    >
      <div className="w-full h-full relative">
        {isSelected && (
          <div className="absolute inset-0 z-10 rounded-[18px] bg-black bg-opacity-50 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        <div className="relative w-full h-full bg-white rounded-[18px] overflow-hidden shadow-[0px_3px_8px_#0000000d]">
          {/* Upper Box */}
          <div className="absolute w-full h-[12rem]">
            <div className="flex absolute w-full h-[12rem]">
              <img
                src={img}
                alt="store"
                className="w-2/3 h-full object-cover"
              />
              <div className="flex flex-col w-1/3 h-full">
                <img
                  src={mainMemuImg1}
                  alt="store"
                  className="w-full h-1/2 object-cover"
                />
                <img
                  src={mainMemuImg2}
                  alt="store"
                  className="w-full h-1/2 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Lower Box */}
          <div
            className={`absolute flex flex-row justify-between w-full bottom-${
              isVoted ? 3 : 5
            } left-0 px-4`}
          >
            <div className="flex flex-col items-center">
              <p className="font-bold text-black text-lg">{title}</p>
              {isVoted && (
                <span className="ml-2 text-sm text-green-500 font-semibold">
                  투표완료
                </span>
              )}
            </div>

            <div className="flex flex-row items-center">
              <progress
                className="w-16 h-2"
                value={voteCount}
                max={50}
                style={{
                  appearance: "none",
                  width: "60px",
                  height: "12px",
                  backgroundColor: "gray",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: voteCount > 50 ? "red" : "#1692fc",
                  }}
                ></div>
              </progress>
              <p className="font-bold text-black text-lg ml-2">{`${voteCount}/50`}</p>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};
