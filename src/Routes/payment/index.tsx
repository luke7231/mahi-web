import { useEffect, useRef, useState } from "react";
import {
  TossPaymentsSDK,
  TossPaymentsWidgets,
  loadTossPayments,
} from "@tosspayments/tosspayments-sdk";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import { nanoid } from "nanoid";
import { useCart } from "../../core/cart";
import { useNavigate } from "react-router-dom";

// test 키
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "FF5zmAd8yIoiJ5fj4d5e2";
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
function Payment() {
  const navi = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [createOrder] = useMutation(CREATE_ORDER);
  const paymentWidgetRef = useRef<TossPaymentsWidgets | null>(null);
  const { cart } = useCart();
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => {
      const q = item.quantity;
      return total + q;
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
  console.log(getTotalQuantity(), getTotalDisount());
  useEffect(() => {
    if (cart.length === 0) {
      navi("/");
    }
  }, [cart]);
  useEffect(() => {
    (async () => {
      const paymentWidget = await (
        await loadTossPayments(clientKey)
      ).widgets({ customerKey });

      // 가격 설정을 미리 해야하네?
      await paymentWidget.setAmount({
        currency: "KRW",
        value: getTotalAmount(),
      });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        paymentWidget.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT", // 생성해놓은 ui 위젯이 여러개라면 구별할 때 쓰임.
        }),
        // ------  이용약관 UI 렌더링 ------
        paymentWidget.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      paymentWidgetRef.current = paymentWidget; // Ref에 저장.
    })();
  }, []);

  const onClickPaymentButton = async () => {
    setClicked(true); // 다시 못 누르게
    const orderId = nanoid(); // 난수 생성 토스페이먼츠에서 권하는 방식.
    const { data } = await createOrder({
      variables: {
        input: {
          totalQuantity: getTotalQuantity(),
          totalDiscount: getTotalDisount(),
          orderId,
          amount: getTotalAmount(), // 이전 페이지에서 받아오기
          productIds: cart.map((item) => item.product.id), // 이전 페이지에서 받아오기 or productID만 받아서 query 치기
        },
      },
      onCompleted: (data) => console.log(data), // TODO: 여러번 클릭되지 않도록? 조치해야할듯 디바운스
    });
    if (data?.createOrder.id) {
      // request.
      paymentWidgetRef.current?.requestPayment({
        orderId,
        orderName: "마감 A팩", // TODO: 이름 변경
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      });
    } else {
      // 문제가 발생했습니다.
      // TODO: toast ui 띄우기
      console.log("문제 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">주문서</h1>

      {/* 총액 표시 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">총 금액</h2>
        <p className="text-2xl font-bold">
          {getTotalAmount().toLocaleString()}원
        </p>
      </div>

      {/* 결제 UI */}
      <div
        id="payment-method"
        className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-300"
      >
        <h2 className="text-xl font-semibold mb-2">결제 방법</h2>
        {/* 실제 결제 UI 컴포넌트를 여기에 추가 */}
      </div>

      {/* 이용약관 UI */}
      <div
        id="agreement"
        className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-300"
      >
        <h2 className="text-xl font-semibold mb-2">이용약관</h2>
        {/* 실제 이용약관 컴포넌트를 여기에 추가 */}
      </div>

      {/* 결제하기 버튼 */}
      <div className="flex justify-center">
        <button
          id="payment-button"
          className={`px-6 py-3 rounded-lg shadow-md transition ${
            clicked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1562FC] hover:bg-[#1562FC]"
          }`}
          disabled={clicked}
          onClick={onClickPaymentButton}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

export default Payment;
