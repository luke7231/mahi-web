import { useEffect, useRef } from "react";
import {
  TossPaymentsSDK,
  TossPaymentsWidgets,
  loadTossPayments,
} from "@tosspayments/tosspayments-sdk";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__";
import { nanoid } from "nanoid";
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
      product {
        id
      }
      createdAt
      updatedAt
    }
  }
`);
function Payment() {
  const [createOrder] = useMutation(CREATE_ORDER);
  const paymentWidgetRef = useRef<TossPaymentsWidgets | null>(null);
  const price = 50_000;

  useEffect(() => {
    (async () => {
      const paymentWidget = await (
        await loadTossPayments(clientKey)
      ).widgets({ customerKey });

      // 가격 설정을 미리 해야하네?
      await paymentWidget.setAmount({
        currency: "KRW",
        value: price,
      });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        paymentWidget.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        paymentWidget.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  const onClickPaymentButton = async () => {
    const orderId = nanoid();
    const { data } = await createOrder({
      variables: {
        input: {
          orderId,
          amount: price, // 이전 페이지에서 받아오기
          productId: 8, // 이전 페이지에서 받아오기 or productID만 받아서 query 치기
        },
      },
      onCompleted: (data) => console.log(data),
    });
    if (data?.createOrder.id) {
      // request.
      paymentWidgetRef.current?.requestPayment({
        orderId,
        orderName: "마감 A팩",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
      });
    } else {
      // 문제가 발생했습니다.
      // toast ui
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
