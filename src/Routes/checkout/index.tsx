import React, { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart";
import Partition from "../../components/common/partition";
import BackArrow from "../../components/common/back-arrow";
import Header from "../../components/common/header";
import NoCart from "../../components/checkout/no-cart";
import { nanoid } from "nanoid";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import TransitionWrapper from "../../components/common/transition-wrapper";
import PickUpTimeBottomSheet from "./pickup-time-bottom-sheet";

const CREATE_ORDER = gql(`
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    orderId
    amount
    coupon
    products {
      id
      name
    }
    createdAt
    updatedAt
  }
}
`);

const ME_QUERY = gql(`
  query Me {
    me {
      id
      phone
      email
      createdAt
      updatedAt
    }
  }
`);

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // useCart 훅을 사용하여 카트 정보를 가져옵니다
  const [createOrder] = useMutation(CREATE_ORDER);

  // 사용자 정보를 가져오는 쿼리
  const { data, loading } = useQuery(ME_QUERY, { fetchPolicy: "no-cache" });

  const userPhone = data?.me?.phone;

  const inputCart = cart.map((item) => {
    // typename왜 넣냐고 시비걸어서 그냥 필터링함
    return {
      product: { id: item?.product?.id as number },
      quantity: item.quantity,
    };
  });
  // 카트의 총액을 계산하는 함수
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.userPrice ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  };
  const getTotalQuantity = (): number => {
    return cart.reduce((total: number, item: { quantity: number }) => {
      const q = item.quantity;
      return total + q;
    }, 0);
  };

  const getTotalDisount = () => {
    return cart.reduce((total, item) => {
      const discount = item.product?.userPrice
        ? item.product.price - item?.product?.userPrice
        : 0;
      return total + discount * item.quantity;
    }, 0);
  };

  const handlePhoneChange = () => {
    localStorage.setItem("redirect", window.location.pathname);

    navigate("/phone-number-auth");
  };

  const handleProceedClick = () => {
    if (!userPhone) {
      alert("연락처를 입력해주세요!");
      return;
    }
    setBottomSheetOpen(true);
  };

  const onClickProceed = async (time: string) => {
    const orderId = nanoid();
    const { data } = await createOrder({
      variables: {
        input: {
          totalQuantity: getTotalQuantity(),
          totalDiscount: getTotalDisount(),
          orderId,
          amount: getTotalAmount(), // 최종 결제 금액 사용
          productIds: cart.map((item) => item?.product?.id),
          pickUpTime: time,
        },
      },
      onCompleted: (data) => console.log(data), // TODO: 여러번 클릭되지 않도록? 조치해야할듯 디바운스
    });

    // 최종 결과 생성
    const goodsName = `마감히어로 팩`;

    const serverAuth = () => {
      window.AUTHNICE.requestPay({
        clientId: process.env.REACT_APP_NICE_PAY_CLIENT_KEY,
        method: "cardAndEasyPay",
        orderId,
        amount: getTotalAmount(),
        appScheme: "mahi://",
        fnError: () => console.error(),
        goodsName,
        returnUrl: `${process.env.REACT_APP_API_URL}/nice-auth`,
        mallReserved: JSON.stringify(inputCart),
      });
    };
    serverAuth();
    // } else {
    // 문제가 발생했습니다.
    // TODO: toast ui 띄우기
    // }
  };
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const handlePickUpTimeConfirm = (time: string) => {
    const currentTime = new Date();
    const [selectedHour, selectedMinute] = time.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(selectedHour, selectedMinute, 0, 0);
    const closingTime = new Date();
    const [closingHour, closingMinute] = cart[0].store.closingHours
      .split(":")
      .map(Number);
    closingTime.setHours(closingHour, closingMinute, 0, 0);

    if (selectedTime <= currentTime) {
      alert("선택한 시간이 현재 시간보다 이전입니다. 다시 선택해주세요.");
      return;
    }

    if (selectedTime >= closingTime) {
      alert("마감시간을 넘습니다. 다시 선택해주세요.");
      return;
    }

    onClickProceed(time);
  };

  return (
    <>
      {cart.length !== 0 ? (
        <div className="container mx-auto h-[100vh]">
          <div onClick={() => navigate(-1)} className="p-5">
            <BackArrow />
          </div>
          <div className="w-full mx-auto h-auto bg-white">
            {/* Header Section */}
            <div className="flex ml-6 text-black mb-0">
              <div className="mt-2 text-xl font-extrabold">마감시간</div>
            </div>
            {/* Main Content Section */}
            <div className="px-4 mt-2">
              <div className="w-full bg-[#f4f5f7] rounded-lg p-4">
                <div className="text-black text-2xl font-semibold">
                  {cart[0]?.store?.closingHours}
                </div>
              </div>
            </div>
            {/* Header Section */}
            <div className="flex ml-6 text-black mb-0 mt-4">
              <div className="mt-2 text-xl font-bold">*내 연락처</div>
            </div>
            {/* Main Content Section */}
            <div className="px-4 mt-2">
              <div
                className={`flex justify-between w-full rounded-lg p-4 ${
                  userPhone ? "bg-[#f4f5f7]" : "bg-red-100"
                }`}
              >
                <div
                  className={`text-2xl font-semibold ${
                    userPhone ? "text-black" : "text-red-500"
                  }`}
                >
                  {userPhone || "연락처가 필요합니다!"}
                </div>
                <button
                  onClick={handlePhoneChange}
                  className="ml-4 text-blue-500 underline"
                >
                  {userPhone ? "편집" : "추가하기"}
                </button>
              </div>
            </div>

            {/* 내가 선택한 팩 */}
            <h2 className="text-xl font-bold ml-6 mb-4 mt-8">
              내가 선택한 마감팩
            </h2>
            <Partition height="thick" color="light" />
            {cart.length !== 0
              ? cart.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-auto flex items-center p-5 relative"
                    >
                      {/* X Icon */}
                      <div
                        className="absolute top-4 right-4 cursor-pointer text-gray-500"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>

                      {/* Image Container */}
                      <div className="w-[3.5rem] h-[3.5rem] bg-[#c4c4c4] rounded-md">
                        <img
                          alt="Cart Item"
                          className="w-full h-full object-cover rounded-md"
                          src={
                            item.product.img || item.product?.menus?.[0]?.img
                          }
                        />
                      </div>

                      {/* Product Info */}
                      <div className="ml-4 flex-1">
                        {/* Product Name */}
                        <div className="flex">
                          <div className="text-black text-sm font-normal leading-[21px]">
                            {item.product.name}
                          </div>
                          <div className="text-[#b6b6b6] text-xs font-normal leading-[21px] ml-2">
                            {item.quantity}개
                          </div>
                        </div>

                        {/* Price and Original Price */}
                        <div className="flex items-baseline space-x-2">
                          <div className="text-black text-base font-semibold">
                            {(
                              item.quantity * item.product?.userPrice
                            ).toLocaleString()}
                            원
                          </div>
                          <div className="text-[#b6b6b6] text-xs line-through">
                            {(
                              item.quantity * item.product?.price
                            ).toLocaleString()}
                            원
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}

            <Partition height="thick" color="light" />
            <div className="px-5 py-4 w-full sticky bottom-0 bg-white">
              <div className="mt-4 text-black text-2xl font-bold text-right">
                최종 금액: {getTotalAmount().toLocaleString()}원
              </div>
              <TransitionWrapper
                scale={0.95}
                opacity={0.8}
                onClick={handleProceedClick}
                className={`fixed bottom-0 mb-4 w-[calc(100%-2rem)] h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg `}
              >
                {/* Button Content */}
                <div className="flex items-center space-x-1">
                  <span className="text-white text-md font-bold leading-snug">
                    결제하고 가지러가기
                  </span>
                </div>
              </TransitionWrapper>
            </div>
          </div>

          <div className="mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="w-full h-[100vh] flex flex-col">
            <Header title="장바구니" />
            <NoCart />
          </div>
        </>
      )}
      <PickUpTimeBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        onConfirm={handlePickUpTimeConfirm}
      />
    </>
  );
};

export default CheckoutPage;
