import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../core/cart";

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
    <div className="container mx-auto p-4">
      <header className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </header>

      <section className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        <div className="mb-4">
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.product.id}
                  className="flex justify-between items-center p-2 border border-gray-300 rounded-lg"
                >
                  <span>{item.product.name}</span>
                  <span>
                    ${item.product.discountPrice ?? item.product.price} x{" "}
                    {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Total: ${getTotalAmount().toFixed(2)}
          </p>
        </div>
      </section>

      {/* 결제 버튼 */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={() => onClickProceed()}
        >
          Proceed to Payment
        </button>
      </div>

      {/* 장바구니로 돌아가기 버튼 */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => onClickBack()}
        >
          Back to Store
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
