import React, { useState } from "react";
import TransitionWrapper from "../../components/common/transition-wrapper";
import FadeInWrapper from "../../components/fade-in-wrapper";
import VoteBottomSheet from "./vote-bottom-sheet";

const VotePage = () => {
  const [checklist, setChecklist] = useState<string[]>([]);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const handleStoreClick = (title: string) => {
    setChecklist((prev) => {
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  const handleVoteClick = () => {
    setBottomSheetOpen(true);
  };

  const handleVoteConfirmClick = () => {
    // setBottomSheetOpen(false);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  const stores = [
    {
      quantity: 5,
      title: "플링크 판교",
      closingHours: "10:00 PM",
      discountPrice: 5000,
      price: 10000,
      isLiked: true,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046910070-7.%ED%94%BC%EB%84%9B%EB%B2%84%ED%84%B0.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046928534-8.%EB%94%B8%EA%B8%B0%EC%9E%BC%ED%81%AC%EB%9F%BC%EB%B8%94.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1735802717710-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%281%29.jpg",
      distance: 1.2,
    },
    {
      quantity: 0,
      title: "기욤 판교 아브뉴프랑점",
      closingHours: "9:00 PM",
      discountPrice: null,
      price: 8000,
      isLiked: false,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      distance: 2.5,
    },
    {
      quantity: 5,
      title: "플링크 판교2",
      closingHours: "10:00 PM",
      discountPrice: 5000,
      price: 10000,
      isLiked: true,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046910070-7.%ED%94%BC%EB%84%9B%EB%B2%84%ED%84%B0.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046928534-8.%EB%94%B8%EA%B8%B0%EC%9E%BC%ED%81%AC%EB%9F%BC%EB%B8%94.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1735802717710-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%281%29.jpg",
      distance: 1.2,
    },
    {
      quantity: 0,
      title: "기욤 판교 아브뉴프랑점2",
      closingHours: "9:00 PM",
      discountPrice: null,
      price: 8000,
      isLiked: false,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      distance: 2.5,
    },
    {
      quantity: 5,
      title: "플링크 판교3",
      closingHours: "10:00 PM",
      discountPrice: 5000,
      price: 10000,
      isLiked: true,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046910070-7.%ED%94%BC%EB%84%9B%EB%B2%84%ED%84%B0.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728046928534-8.%EB%94%B8%EA%B8%B0%EC%9E%BC%ED%81%AC%EB%9F%BC%EB%B8%94.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1735802717710-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%281%29.jpg",
      distance: 1.2,
    },
    {
      quantity: 0,
      title: "기욤 판교 아브뉴프랑점",
      closingHours: "9:00 PM",
      discountPrice: null,
      price: 8000,
      isLiked: false,
      mainMemuImg1:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      mainMemuImg2:
        "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1734065556183-KakaoTalk_20241213_135156314.jpg",
      distance: 2.5,
    },
    // ... more stores ...
  ];

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

      {stores.map((store, index) => (
        <div className="w-full h-full mb-6" key={index}>
          <StoreCard
            quantity={store.quantity}
            title={store.title}
            closingHours={store.closingHours}
            discountPrice={store.discountPrice}
            price={store.price}
            onClick={() => handleStoreClick(store.title)}
            onClickHeart={(e) => {
              e.stopPropagation();
              console.log(`${store.title} heart clicked`);
            }}
            onClickNoti={(e) => {
              e.stopPropagation();
              console.log(`${store.title} notification clicked`);
            }}
            img={store.img}
            isLiked={store.isLiked}
            distance={store.distance}
            disableLike={false}
            mainMemuImg1={store.mainMemuImg1}
            mainMemuImg2={store.mainMemuImg2}
          />
        </div>
      ))}
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
  onClickHeart: (e: React.MouseEvent) => void;
  onClickNoti?: (e: React.MouseEvent) => void;
  quantity: number | undefined;
  title: string;
  closingHours: string;
  discountPrice?: number | null | undefined;
  price: number;
  isLiked: boolean | undefined | null;
  img: string;
  distance?: number | null;
  disableLike?: boolean;
  mainMemuImg1?: string;
  mainMemuImg2?: string;
}

export const StoreCard = ({
  quantity,
  title,
  closingHours,
  discountPrice,
  price,
  onClick,
  onClickHeart,
  onClickNoti,
  img,
  isLiked,
  distance,
  disableLike = false,
  mainMemuImg1,
  mainMemuImg2,
}: IProp): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
    onClick();
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
          <div className="absolute flex flex-row justify-between w-full bottom-5 left-0 px-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-black text-lg">{title}</p>
            </div>

            <div className="flex flex-row items-center">
              <progress
                className="w-16 h-2"
                value={101}
                max={100}
                style={{
                  appearance: "none",
                  width: "36px",
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
                    backgroundColor: 101 > 100 ? "red" : "#1692fc",
                  }}
                ></div>
              </progress>
              <p className="font-bold text-black text-lg ml-2">{`${101}/100`}</p>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};
