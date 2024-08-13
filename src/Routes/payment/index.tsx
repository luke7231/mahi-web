import { useEffect, useRef } from "react";
import {
  TossPaymentsSDK,
  TossPaymentsWidgets,
  loadTossPayments,
} from "@tosspayments/tosspayments-sdk";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import { nanoid } from "nanoid";
import { useCart } from "../../core/cart";
// import { ANONYMOUS } from "@tosspayments/payment-widget-sdk"

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
  const [createOrder] = useMutation(CREATE_ORDER);
  const paymentWidgetRef = useRef<TossPaymentsWidgets | null>(null);
  const { cart } = useCart();
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

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
    const orderId = nanoid(); // 난수 생성 토스페이먼츠에서 권하는 방식.
    const { data } = await createOrder({
      variables: {
        input: {
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
    <div className="App">
      <h1>주문서</h1>
      {/* <!-- 결제 UI --> */}
      <div id="payment-method"></div>
      {/* <!-- 이용약관 UI --> */}
      <div id="agreement"></div>
      {/* <!-- 결제하기 버튼 --> */}
      <button
        id="payment-button"
        className="mt-[30px]"
        onClick={() => onClickPaymentButton()}
      >
        결제하기
      </button>
    </div>
  );
}

export default Payment;
