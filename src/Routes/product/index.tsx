import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../core/cart";
import { useAuth } from "../../core/auth";
import Partition from "../../components/common/partition";
import BACK_IMG from "../../components/common/back-img.png";

import Skeleton from "react-loading-skeleton";
import BusinessInfo from "./business-info";
import LoginBottomSheet from "./login-bottom-sheet";
import { calculateDiscountRate } from "../../Lib/calc-util";
import TransitionWrapper from "../../components/common/transition-wrapper";

const GET_PRODUCT = gql`
  query Product($productId: Int!) {
    product(id: $productId) {
      id
      store {
        id
        title
        closingHours
        address
      }
      name
      price
      discountPrice
      userPrice
      quantity
      description
      saleEndTime
      createdAt
      updatedAt
      img
      menus {
        id
        img
        quantity
      }
    }
  }
`;

const Product = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      productId: Number(id),
    },
  });
  const [quantity, setQuantity] = useState(1);
  // 수량 증가 함수
  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // 수량 감소 함수
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const product = data?.product;
  function onClickButton() {
    if (!isLoggedIn) {
      // 현재 페이지 경로를 쿼리 파라미터로 추가
      setIsSheetOpen(true);
      return;
    }

    addToCart(product, quantity, {
      closingHours: product?.store?.closingHours,
      address: product?.store?.address,
      title: product?.store?.title,
    }); // 전역변수에 추가
    navigate(`/store/${product.store.id}`);
  }
  useEffect(() => {
    if (product?.quantity === 0) {
      setQuantity(0);
    }
  }, [product?.quantity]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="container h-[100vh] mx-auto bg-[#F4F5F7]">
      <>
        <div className="relative w-full mx-auto bg-white overflow-hidden">
          {/* Image Container */}
          <div className="relative w-full">
            <img
              src={BACK_IMG}
              onClick={() => navigate(-1)}
              className="absolute top-5 left-5 w-[40px] h-[40px] z-10"
            />

            <div className="flex overflow-scroll">
              {loading && (
                <Skeleton
                  style={{ height: 240, width: "100vw", lineHeight: 2 }}
                />
              )}
              {product?.menus ? (
                <div className="flex p-2 gap-2">
                  {!loading &&
                    [...product.menus]
                      .reverse()
                      .map(
                        (
                          menu: { id: number; img: string; quantity: number },
                          index: number
                        ) => (
                          <div className="relative w-60 h-60 rounded-lg overflow-hidden">
                            <img
                              src={menu.img}
                              className="w-60 h-60 object-cover"
                            />
                            <div className="absolute bottom-2 right-1.5 rounded-md opacity-80 bg-black text-white p-2 px-2.5">
                              <p className="text-lg font-semibold">
                                x{menu.quantity}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                </div>
              ) : (
                <img
                  className="object-cover w-full h-56"
                  alt="Product"
                  src={(product?.img as string) || product?.menus[0].img}
                />
              )}
            </div>
          </div>

          {/* Store Name */}
          <div className="px-4 py-3">
            <div className="flex justify-between mb-3 ">
              {loading ? (
                <Skeleton style={{ height: 31, width: 80 }} />
              ) : (
                <h2 className="text-3xl font-semibold text-black">
                  {product?.name}
                </h2>
              )}
              {/* Favorite Icon */}
              <div className="flex items-center"></div>
            </div>

            {/* Pickup and Walk Time Info */}
            <div className="flex items-center text-md">
              {product?.description}
            </div>
          </div>
        </div>
        <Partition color="light" height="thick" />
        <div className="w-full p-5 h-auto flex justify-between items-center bg-white">
          {/* Price Label */}
          {loading ? (
            <Skeleton style={{ height: 20, width: 58 }} />
          ) : (
            <div className="text-black text-lg font-semibold">가격</div>
          )}

          {/* Prices */}
          <div className="flex items-center space-x-2">
            {/* Original Price */}
            {loading ? (
              <Skeleton style={{ height: 20, width: 58 }} />
            ) : (
              <div className="text-[#dadada] text-lg line-through">
                {product?.price.toLocaleString()}원
              </div>
            )}

            {/* Discounted Price */}
            {loading ? (
              <Skeleton style={{ height: 20, width: 58 }} />
            ) : (
              <div className="text-black text-lg font-bold">
                {product?.userPrice.toLocaleString()}원
              </div>
            )}
          </div>
        </div>
        <Partition color="light" height="md" />
        <div className="w-full h-auto flex items-center justify-between px-5 py-5 bg-white">
          {/* Label */}
          <div className="flex items-center">
            {loading ? (
              <Skeleton style={{ height: 20, width: 58 }} />
            ) : (
              <div className="text-black text-lg font-semibold">수량</div>
            )}

            <span className="text-xs text-[#1562fc] ml-2">
              {product?.quantity}개 남음
            </span>
          </div>
          {/* Quantity Controls */}
          <div className="flex items-center">
            {/* Minus Button */}
            <div
              onClick={decreaseQuantity}
              className="w-[43px] h-[43px] flex items-center justify-center border border-[#e1e1e1] rounded-tl-[3px] rounded-bl-[3px]"
            >
              <span className="text-black text-xl">-</span>
            </div>

            {/* Quantity Display with Only Top and Bottom Borders */}
            <div className="w-[43px] h-[43px] flex items-center justify-center border-t border-b border-[#e1e1e1]">
              <span className="text-black text-base font-semibold">
                {quantity}
              </span>
            </div>

            {/* Plus Button */}
            <div
              onClick={increaseQuantity}
              className="w-[43px] h-[43px] flex items-center justify-center border border-[#e1e1e1] rounded-tr-[3px] rounded-br-[3px]"
            >
              <span className="text-black text-xl">+</span>
            </div>
          </div>
        </div>
        <Partition color="light" height="md" />

        {/* Business Information */}
        <div className={`w-full h-80 bg-[#F4F5F7]`} />
        <BusinessInfo />
      </>
      {product?.quantity !== 0 ? (
        <div
          onClick={() => onClickButton()}
          className="px-5 py-4 w-full sticky bottom-0 bg-white"
        >
          <div className="absolute left-0 top-[-2.7rem] w-full h-[43px] bg-[#282828] rounded-tl-[10px] rounded-tr-[10px] text-white text-sm font-semibold flex justify-center items-center">
            {(product?.price - product?.userPrice).toLocaleString()}원{" "}
            할인받았어요!
          </div>
          <TransitionWrapper
            scale={0.95}
            opacity={0.8}
            className=" w-full h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border"
          >
            {/* Button Content */}
            <div className="text-center flex items-center space-x-1">
              <span className="text-white text-base font-semibold leading-snug">
                {quantity}개
              </span>
              <span className="text-white text-base font-bold leading-snug">
                {(quantity * product?.userPrice).toLocaleString()}원
              </span>
              <span className="text-white text-base font-semibold leading-snug">
                담기
              </span>
            </div>
          </TransitionWrapper>
        </div>
      ) : null}
      <LoginBottomSheet
        discountRate={calculateDiscountRate(product?.price, product?.userPrice)}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </div>
  );
};

export default Product;
