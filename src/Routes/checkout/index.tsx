import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart";
import Partition from "../../components/common/partition";
import BackArrow from "../../components/common/back-arrow";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // useCart 훅을 사용하여 카트 정보를 가져옵니다

  // 카트의 총액을 계산하는 함수
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const onClickProceed = () => {
    navigate("/payment");
  };
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className="container mx-auto h-[100vh]">
      <div onClick={() => navigate(-1)} className="p-5">
        <BackArrow />
      </div>
      <div className="w-full max-w-md mx-auto h-auto mt-10 bg-white">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center text-black mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M11.25 7.58333V11.25L14 14M19.5 11.25C19.5 12.3334 19.2866 13.4062 18.872 14.4071C18.4574 15.4081 17.8497 16.3175 17.0836 17.0836C16.3175 17.8497 15.4081 18.4574 14.4071 18.872C13.4062 19.2866 12.3334 19.5 11.25 19.5C10.1666 19.5 9.0938 19.2866 8.09286 18.872C7.09193 18.4574 6.18245 17.8497 5.41637 17.0836C4.65029 16.3175 4.0426 15.4081 3.62799 14.4071C3.21339 13.4062 3 12.3334 3 11.25C3 9.06196 3.86919 6.96354 5.41637 5.41637C6.96354 3.86919 9.06196 3 11.25 3C13.438 3 15.5365 3.86919 17.0836 5.41637C18.6308 6.96354 19.5 9.06196 19.5 11.25Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div className="mt-2 text-2xl font-semibold">
            주문 전 마감 시간을
            <br />
            확인해주세요
          </div>
        </div>
        {/* Main Content Section */}
        <div className=" p-4">
          <div className="w-full bg-[#f4f5f7] rounded-lg p-6">
            <div className="text-center text-sm text-[#828282]">
              매장 마감 시간
            </div>
            <div className="text-center text-black text-6xl font-semibold">
              18:00
            </div>

            {/* Notification Box */}
            <div className="flex justify-center mt-1">
              <div className="w-44 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                <p className="text-xs text-[#1562fc] leading-tight text-center">
                  이 매장은 마감시간 이후에도
                  <br />
                  문앞 픽업이 가능한 매장이에요!
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold ml-6 mb-4 mt-6">내가 선택한 팩</h2>
        <Partition height="thick" color="light" />
        {cart.length !== 0
          ? cart.map((item) => {
              return (
                <>
                  <div className="w-full max-w-sm h-auto flex items-center p-5">
                    {/* Image Container */}
                    <div className="w-[3.5rem] h-[3.5rem]  bg-[#c4c4c4] rounded-md">
                      <img
                        alt="Cart Item"
                        className="w-full h-full object-cover rounded-md"
                        src={item.product.img}
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
                            item.quantity * item.product?.discountPrice
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
                </>
              );
            })
          : null}
        <Partition height="thick" color="light" />
        <div className="px-5 py-4 w-full sticky bottom-0 bg-white">
          <div
            onClick={() => onClickProceed()}
            className="w-full max-w-md h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border"
          >
            {/* Button Content */}
            <div className="text-center flex items-center space-x-1">
              <span className="text-white text-base font-semibold leading-snug">
                결제하고 가지러가기
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutPage;
