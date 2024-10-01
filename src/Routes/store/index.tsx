import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../__generated__/graphql";
import { useCart } from "../../core/cart";
import { useEffect, useState } from "react";
import Partition from "../../components/common/partition";
import { gql } from "../../__generated__";
import NoProduct from "../../components/store/no-product";
import HeartBlackBorder from "../../components/common/heart-black-border";
import { useAuth } from "../../core/auth";
import { CANCEL_LIKE, LIKE_STORE } from "../home";
import BACK_IMG from "../../components/common/back-img.png";
import LoadingDots from "../../components/loading-dots";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const GET_STORE = gql(`
  query Store($storeId: Int!) {
    store(id: $storeId) {
      id
      lat
      lng
      title
      createdAt
      updatedAt
      address
      likes {
        id
        userId
        storeId
      }
      isLiked
      products {
        id
        name
        price
        discountPrice
        img
        isDeleted
        saleEndTime
        quantity
        menus {
          id
          img
          menu {
            id
            name
            img
          }
        }
      }
      img
      contactNumber
      closingHours
    }
  }
`);

const Store = () => {
  const { isLoggedIn } = useAuth();
  // const [timeString, setTimeString] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(GET_STORE, {
    variables: {
      storeId: Number(id),
    },
    onCompleted: (data) => console.log(data.store?.products),
    fetchPolicy: "network-only",
  });
  const store = data?.store;
  const [likeStore] = useMutation(LIKE_STORE, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.error(error),
    refetchQueries: [
      {
        query: GET_STORE,
        variables: {
          storeId: Number(id),
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
        query: GET_STORE,
        variables: {
          storeId: Number(id),
        },
      },
    ],
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStoreStatus = () => {
      if (store?.closingHours) {
        const currentTime = new Date();
        const closingTime = new Date();

        // closingHours를 "HH:mm" 형식으로 가정
        const [closingHoursHour, closingHoursMinute] = store?.closingHours
          .split(":")
          .map(Number);
        closingTime.setHours(closingHoursHour);
        closingTime.setMinutes(closingHoursMinute);
        closingTime.setSeconds(0); // 초는 0으로 설정하여 정확한 비교

        // 현재 시간이 closingHours보다 이전이면 영업중
        if (currentTime < closingTime) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    };

    checkStoreStatus();

    // 상태 업데이트를 위해 주기적으로 확인 (선택 사항)
    const interval = setInterval(checkStoreStatus, 60000); // 1분마다 상태 확인
    return () => clearInterval(interval);
  }, [store?.closingHours]);
  function onClickProduct(id: number) {
    navigate(`/product/${id}`);
  }
  function onClickPurchage() {
    navigate("/checkout");
  }
  const { cart } = useCart(); // useCart 훅을 사용하여 cart 가져오기

  // 카트의 총액 계산
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalDisount = () => {
    return cart.reduce((total, item) => {
      const discount = item.product?.discountPrice
        ? item.product.price - item?.product?.discountPrice
        : 0;
      return total + discount * item.quantity;
    }, 0);
  };
  // useEffect(() => {
  //   // saleEndTime을 Date 객체로 변환
  //   if (store) {
  //     const date = new Date(store.closingHours);

  //     // 시와 분 추출
  //     let hours = date.getUTCHours(); // 한국 시간에서 UTC로 변환하려면 9시간을 빼야 합니다
  //     let minutes = date.getUTCMinutes();

  //     // 시와 분을 2자리로 포맷
  //     //   if (hours < 0) {
  //     //     hours += 24; // 24시간 형식으로 조정
  //     //   }
  //     const formattedHours = hours.toString().padStart(2, "0");
  //     const formattedMinutes = minutes.toString().padStart(2, "0");

  //     // 시와 분을 원하는 형식으로 조합
  //     setTimeString(`${formattedHours}:${formattedMinutes}`);
  //   }
  // }, [store]);

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
  function copyToClipboard(text: string) {
    // 클립보드에 텍스트를 쓰기
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // 복사 성공
        alert("텍스트가 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        // 복사 실패
        console.error("복사 실패:", err);
      });
  }

  return (
    <div className="container mx-auto bg-[#f6f6f6]">
      {store ? (
        <>
          <div className="relative w-full mx-auto bg-white overflow-hidden">
            <div className="relative w-full">
              <img
                src={BACK_IMG}
                onClick={() => navigate(-1)}
                className="absolute top-5 left-5 w-[40px] h-[40px]"
                alt="back"
              />
              <img
                className="w-full h-56 object-cover"
                alt="Store"
                src={store.img as string}
              />
            </div>

            <div className="px-4 py-3">
              <div className="flex justify-between mb-3 ">
                <h2 className="text-3xl font-semibold text-black">
                  {store.title}
                </h2>
                <div className="flex items-center">
                  <HeartBlackBorder
                    isLiked={store.isLiked}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await onClickLike(
                        store?.id as number,
                        store?.isLiked as boolean
                      );
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center text-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="mr-[1px] mt-[1px]"
                >
                  <path
                    d="M5.5 3.5V5.5L7 7M10 5.5C10 6.09095 9.8836 6.67611 9.65746 7.22208C9.43131 7.76804 9.09984 8.26412 8.68198 8.68198C8.26412 9.09984 7.76804 9.43131 7.22208 9.65746C6.67611 9.8836 6.09095 10 5.5 10C4.90905 10 4.32389 9.8836 3.77792 9.65746C3.23196 9.43131 2.73588 9.09984 2.31802 8.68198C1.90016 8.26412 1.56869 7.76804 1.34254 7.22208C1.1164 6.67611 1 6.09095 1 5.5C1 4.30653 1.47411 3.16193 2.31802 2.31802C3.16193 1.47411 4.30653 1 5.5 1C6.69347 1 7.83807 1.47411 8.68198 2.31802C9.52589 3.16193 10 4.30653 10 5.5Z"
                    stroke="#585858"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-base">
                    {store.closingHours}까지
                  </span>{" "}
                  <span className="text-[#b6b6b6]">픽업 &middot; 도보</span> 약
                  8분
                </p>
              </div>
            </div>
          </div>

          <Partition />

          <div className="w-full p-4 bg-white">
            <div className="flex flex-col text-sm leading-[21px] space-y-1">
              <div className="flex">
                <span className="text-gray-600">가게 위치</span>
                <span className="text-black ml-2">{store.address}</span>
                <div
                  className="ml-2 px-1.5 rounded-3xl text-2xs bg-[#f4f5f7] text-[#969696]"
                  onClick={() => copyToClipboard(store.address as string)}
                >
                  복사하기
                </div>
              </div>

              <div className="flex">
                <span className="text-gray-600">영업 시간</span>
                <span className="text-black ml-2">
                  ~{store?.closingHours}까지{" "}
                  <span className="font-bold">
                    {isOpen ? "영업중" : "영업종료"}
                  </span>
                </span>
              </div>

              <div className="flex">
                <span className="text-gray-600">매장 번호</span>
                <span className="text-black ml-2">
                  {store?.contactNumber || "비공개"}
                </span>
              </div>
            </div>
          </div>

          <Partition color="light" height="thick" />

          {store.products?.length === 0 ? (
            <NoProduct
              isLiked={store.isLiked}
              onClickButton={async (e) => {
                e.stopPropagation();
                await onClickLike(
                  store?.id as number,
                  store?.isLiked as boolean
                );
              }}
            />
          ) : (
            <div className="w-full p-5 pb-20 h-full gap-y-5 relative flex flex-col ">
              {store?.products
                ?.filter(
                  (product) =>
                    product.isDeleted === false || product.isDeleted === null
                )
                .map((product) => (
                  <div
                    key={product.id}
                    className="w-full h-full flex rounded-[0.625rem] border border-[#F9F9F9] bg-white shadow-[0_3px_8px_0_rgba(0,0,0,0.05)]"
                  >
                    <div className="relative w-1/3">
                      <ProductImageSlider product={product} />
                      {product.quantity === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-l-lg">
                          <span className="text-white text-xl font-semibold">
                            품절
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      onClick={() => onClickProduct(product.id)}
                      className="w-2/3 p-4 flex flex-col justify-between"
                    >
                      <div className="text-black text-lg font-semibold">
                        {product.name}
                      </div>
                      <div className="bg-[#f3f3f3] px-2 pb-1 rounded-md w-fit mt-2">
                        <span className="text-black text-xs font-bold">
                          {product.quantity}개
                        </span>
                        <span className="text-black text-xs font-normal">
                          {" "}
                          남았어요!
                        </span>
                      </div>
                      <div className="flex flex-col items-end mt-2">
                        <div className="text-xl text-black font-bold">
                          {product.discountPrice?.toLocaleString()}원
                        </div>
                        <div className="text-xs text-[#b6b6b6] line-through">
                          {product.price.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : null}
      {cart.length > 0 && (
        <div
          onClick={() => onClickPurchage()}
          className="px-5 py-4 w-full sticky bottom-0 bg-white"
        >
          <div className="absolute left-0 top-[-2.7rem] w-full h-[43px] bg-[#282828] rounded-tl-[10px] rounded-tr-[10px] text-white text-sm font-semibold flex justify-center items-center">
            <span className="text-[#fd4242] mr-1">
              {getTotalDisount().toLocaleString()}원
            </span>{" "}
            할인받았어요!
          </div>
          <div className="w-full h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border">
            <div className="text-center flex items-center space-x-1">
              <span className="text-white font-bold leading-snug">
                {getTotalAmount().toLocaleString()}원
              </span>
              <span className="text-white text-base font-semibold leading-snug">
                구매하기
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;

const ProductImageSlider: React.FC<{ product: any }> = ({ product }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current), // 슬라이드 변경 후 상태 업데이트
  };

  // 메뉴 이미지 배열
  const menuImages = product.menus?.map((menu: any) => menu.img) || [];

  // 메뉴가 1개일 경우 슬라이더 대신 단일 이미지로 표시
  if (menuImages.length === 1) {
    return (
      <div>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={menuImages[0] || product.img}
          alt="Menu"
        />
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <Slider {...settings}>
        {menuImages.map((img: string, index: number) => (
          <div key={index} className="flex">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={img || product.img}
              alt={`Menu ${index + 1}`}
            />
          </div>
        ))}
      </Slider>

      {/* Custom Dots */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {menuImages.map((_: any, index: number) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-[#1562fc]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
