import { useEffect, useRef } from "react";
import {
  TossPaymentsSDK,
  loadTossPayments,
} from "@tosspayments/tosspayments-sdk";
// import { ANONYMOUS } from "@tosspayments/payment-widget-sdk"

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const customerKey = "FF5zmAd8yIoiJ5fj4d5e2";
function Payment() {
  const paymentWidgetRef = useRef<TossPaymentsSDK["widgets"] | null>(null);
  const price = 50_000;

  useEffect(() => {
    (async () => {
      const paymentWidget = await (
        await loadTossPayments(clientKey)
      ).widgets({ customerKey });

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

      // 가격 설정
      await paymentWidget.setAmount({
        currency: "KRW",
        value: 50000,
      });
    })();
  }, []);

  return (
    <div className="App">
      <h1>주문서</h1>
      {/* <!-- 결제 UI --> */}
      <div id="payment-method"></div>
      {/* <!-- 이용약관 UI --> */}
      <div id="agreement"></div>
      {/* <!-- 결제하기 버튼 --> */}
      <button id="payment-button" className="mt-[30px]">
        결제하기
      </button>
    </div>
  );
}

export default Payment;
