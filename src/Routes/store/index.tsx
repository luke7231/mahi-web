import { useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../__generated__/graphql";
import { useCart } from "../../core/cart";
import { useEffect, useState } from "react";
import Partition from "../../components/common/partition";
import { gql } from "../../__generated__";
import NoProduct from "../../components/store/no-product";

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
        saleEndTime
        quantity
      }
      img
    }
  }
`);

const Store = () => {
  const [timeString, setTimeString] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_STORE, {
    variables: {
      storeId: Number(id),
    },
  });
  const store = data?.store;

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
  useEffect(() => {
    // saleEndTime을 Date 객체로 변환
    if (store) {
      const date = new Date(store.products?.[0].saleEndTime);

      // 시와 분 추출
      let hours = date.getUTCHours(); // 한국 시간에서 UTC로 변환하려면 9시간을 빼야 합니다
      let minutes = date.getUTCMinutes();

      // 시와 분을 2자리로 포맷
      //   if (hours < 0) {
      //     hours += 24; // 24시간 형식으로 조정
      //   }
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");

      // 시와 분을 원하는 형식으로 조합
      setTimeString(`${formattedHours}:${formattedMinutes}`);
    }
  }, [store]);

  return (
    <div className="container h-[120vh] mx-auto mb-20">
      {store ? (
        <>
          <div className="relative w-full max-w-sm mx-auto bg-white overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full">
              <img
                className="w-full h-56 object-cover"
                alt="Store"
                src={store.img as string}
              />
            </div>

            {/* Store Name */}
            <div className="px-4 py-3">
              <div className="flex justify-between mb-3 ">
                <h2 className="text-3xl font-semibold text-black">
                  {store.title}
                </h2>
                {/* Favorite Icon */}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      d="M2.31804 2.31804C1.90017 2.7359 1.5687 3.23198 1.34255 3.77795C1.1164 4.32392 1 4.90909 1 5.50004C1 6.09099 1.1164 6.67616 1.34255 7.22213C1.5687 7.7681 1.90017 8.26417 2.31804 8.68204L10 16.364L17.682 8.68204C18.526 7.83812 19.0001 6.69352 19.0001 5.50004C19.0001 4.30656 18.526 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3066 1.00001 12.162 1.47412 11.318 2.31804L10 3.63604L8.68204 2.31804C8.26417 1.90017 7.7681 1.5687 7.22213 1.34255C6.67616 1.1164 6.09099 1 5.50004 1C4.90909 1 4.32392 1.1164 3.77795 1.34255C3.23198 1.5687 2.7359 1.90017 2.31804 2.31804Z"
                      stroke="#292929"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Pickup and Walk Time Info */}
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
                    {timeString}까지
                  </span>{" "}
                  <span className="text-[#b6b6b6]">픽업 &middot; 도보</span> 약
                  8분
                </p>
              </div>
            </div>
          </div>
          <Partition />
          <div className="w-full max-w-md p-4 bg-white">
            {/* Container for labels and content */}
            <div className="flex flex-col text-sm leading-[21px] space-y-1">
              {/* Row for 가게 위치 */}
              <div className="flex">
                <span className="text-gray-600">가게 위치</span>
                <span className="text-black ml-2">{store.address}</span>
                <button className="ml-2 px-1.5 rounded-3xl text-2xs bg-[#f4f5f7] text-[#969696]">
                  지도보기
                </button>
              </div>

              {/* Row for 영업 시간 */}
              <div className="flex">
                <span className="text-gray-600">영업 시간</span>
                <span className="text-black ml-2">
                  10:00~18:00 <span className="font-bold">영업중</span>
                </span>
              </div>

              {/* Row for 매장 번호 */}
              <div className="flex">
                <span className="text-gray-600">매장 번호</span>
                <span className="text-black ml-2">비공개</span>
              </div>
            </div>
          </div>
          <Partition color="light" height="thick" />

          {/* 상품 목록 */}
          {store.products?.length === 0 ? (
            <NoProduct />
          ) : (
            <div className="w-full p-5 h-auto gap-y-5 relative flex flex-col">
              {store?.products?.map((product) => {
                return (
                  <div
                    onClick={() => onClickProduct(product.id)}
                    className="w-full h-full flex rounded-[0.625rem] border border-[#F9F9F9] bg-white shadow-[0_3px_8px_0_rgba(0,0,0,0.05)]"
                  >
                    <img
                      className="w-1/3 aspect-square rounded-l-lg object-cover"
                      src={product.img as string}
                      alt="Product"
                    />

                    {/* Product Info */}
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      {/* Product Name */}
                      <div className="text-black text-lg font-semibold">
                        {product.name}
                      </div>

                      {/* Stock Info */}
                      <div className="bg-[#f3f3f3] px-2 pb-1 rounded-md w-fit mt-2">
                        <span className="text-black text-xs font-bold">
                          {product.quantity}개
                        </span>
                        <span className="text-black text-xs font-normal">
                          {" "}
                          남았어요!
                        </span>
                      </div>

                      {/* Price Info */}
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
                );
              })}
            </div>
          )}
        </>
      ) : null}
      {cart.length > 0 ? (
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
          <div className=" w-full max-w-md h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border">
            {/* Button Content */}
            <div className="text-center flex items-center space-x-1">
              <span className="text-white text- font-bold leading-snug">
                {getTotalAmount().toLocaleString()}원
              </span>
              <span className="text-white text-base font-semibold leading-snug">
                구매하기
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Store;
