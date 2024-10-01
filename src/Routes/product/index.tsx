import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../core/cart";
import { useAuth } from "../../core/auth";
import Partition from "../../components/common/partition";
import BACK_IMG from "../../components/common/back-img.png";
import LoadingDots from "../../components/loading-dots";
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
      navigate("/login");
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
  return (
    <div className="container h-[100vh] mx-auto bg-[#F4F5F7]">
      {loading ? <LoadingDots /> : null}
      {product ? (
        <>
          <div className="relative w-full mx-auto bg-white overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full">
              <img
                src={BACK_IMG}
                onClick={() => navigate(-1)}
                className="absolute top-5 left-5 w-[40px] h-[40px]"
              />

              <div className="flex overflow-scroll">
                {product.menus ? (
                  <>
                    {product.menus.map((menu: { id: number; img: string }) => (
                      <img
                        src={menu.img}
                        className=" rounded m-4 h-56 aspect-square"
                      />
                    ))}
                  </>
                ) : (
                  <img
                    className="object-cover w-full h-56"
                    alt="Product"
                    src={(product.img as string) || product.menus[0].img}
                  />
                )}
              </div>
            </div>

            {/* Store Name */}
            <div className="px-4 py-3">
              <div className="flex justify-between mb-3 ">
                <h2 className="text-3xl font-semibold text-black">
                  {product.name}
                </h2>
                {/* Favorite Icon */}
                <div className="flex items-center"></div>
              </div>

              {/* Pickup and Walk Time Info */}
              <div className="flex items-center text-md">
                {product.description}
              </div>
            </div>
          </div>
          <Partition color="light" height="thick" />
          <div className="w-full p-5 h-auto flex justify-between items-center bg-white">
            {/* Price Label */}
            <div className="text-black text-lg font-semibold">가격</div>

            {/* Prices */}
            <div className="flex items-center space-x-2">
              {/* Original Price */}
              <div className="text-[#dadada] text-lg line-through">
                {product?.price.toLocaleString()}원
              </div>

              {/* Discounted Price */}
              <div className="text-black text-lg font-bold">
                {product.userPrice.toLocaleString()}원
              </div>
            </div>
          </div>
          <Partition color="light" height="md" />
          <div className="w-full h-auto flex items-center justify-between px-5 py-5 bg-white">
            {/* Label */}
            <div className="flex items-center">
              <div className="text-black text-lg font-semibold">수량</div>
              <span className="text-xs text-[#1562fc] ml-2">
                {product.quantity}개 남음
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
          <div className="bg-[#F4F5F7] p-6 mt-8 pb-20">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              사업자 정보
            </h2>
            <div className="text-gray-700 text-xs">
              <p className="mb-2">
                <span className="font-bold">상호명: </span>
                육각형
              </p>
              <p className="mb-2">
                <span className="font-bold">대표자명: </span>
                원요한
              </p>
              <p className="mb-2">
                <span className="font-bold">사업자등록번호: </span>
                329-49-00934
              </p>
              <p className="mb-2">
                <span className="font-bold">사업장 주소: </span>
                경기도 성남시 수정구 성남대로 1342, 6층 617호 (복정동)
              </p>
              <p className="mb-2">
                <span className="font-bold">유선번호: </span>
                010-9073-0701
              </p>
            </div>
          </div>
        </>
      ) : null}
      {product?.quantity !== 0 ? (
        <div
          onClick={() => onClickButton()}
          className="px-5 py-4 w-full sticky bottom-0 bg-white"
        >
          <div className="absolute left-0 top-[-2.7rem] w-full h-[43px] bg-[#282828] rounded-tl-[10px] rounded-tr-[10px] text-white text-sm font-semibold flex justify-center items-center">
            {(product?.price - product?.userPrice).toLocaleString()}원{" "}
            할인받았어요!
          </div>
          <div className=" w-full h-[60px] flex items-center justify-center bg-[#1562fc] rounded-lg border">
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
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Product;
