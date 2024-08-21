import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../core/cart";

const GET_PRODUCT = gql`
  query Product($productId: Int!) {
    product(id: $productId) {
      id
      store {
        id
      }
      name
      price
      discountPrice
      quantity
      description
      saleEndTime
      createdAt
      updatedAt
      img
    }
  }
`;

const Product = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT, {
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
    addToCart(product, quantity); // 전역변수에 추가
    navigate(`/store/${product.store.id}`);
  }
  return (
    <div className="container mx-auto p-4">
      {product ? (
        <>
          {/* 헤더 */}
          <header className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600">Product ID: {product.id}</p>
          </header>

          {/* 상품 정보 */}
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-xl font-semibold">Price: ${product.price}</p>
                {product.discountPrice < product.price && (
                  <p className="text-lg text-red-500 font-semibold">
                    Discount Price: ${product.discountPrice}
                  </p>
                )}
                <p className="text-gray-600">
                  Quantity Available: {product.quantity}
                </p>
                <p className="text-gray-500 text-sm">
                  Created on {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated on {new Date(product.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                {/* Placeholder for product image */}
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                  {product.img ? (
                    <img
                      src={product.img}
                      className="object-cover w-32 h-32 rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500 text-xl">Image</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Sale ends on:{" "}
                {new Date(product.saleEndTime).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* 상품 설명 */}
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>

          {/* 수량 선택 */}
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Quantity</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                max={product.quantity}
                readOnly
                className="w-16 text-center border border-gray-300 rounded-lg py-2"
              />
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </section>

          {/* 구매 버튼 */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => onClickButton()}
            >
              1개 담기
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Product;
