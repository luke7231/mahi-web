// import { gql, useQuery } from "@apollo/client";

import { useNavigate, useSearchParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { useState } from "react";
const CHECK_AMOUNT = gql(`
  query Query($orderId: String!, $amount: Float!, $paymentKey: String!) {
    compareOrderAmount(
      orderId: $orderId
      amount: $amount
      paymentKey: $paymentKey
    ) {
      ok
      error
    }
  }
`);

export function SuccessPage() {
  const navigate = useNavigate();
  const [승인완료, set승인완료] = useState(false);
  const [에러발생, set에러발생] = useState(false);
  const [에러메세지, set에러메세지] = useState("");
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") as string;
  const amount = searchParams.get("amount") as string;
  const paymentKey = searchParams.get("paymentKey") as string;
  const { data } = useQuery(CHECK_AMOUNT, {
    variables: { orderId, amount: Number(amount), paymentKey },
    onCompleted: (data) => {
      console.log(data);
      if (data.compareOrderAmount.ok) {
        set승인완료(true);
      } else {
        // 문제발생했습니다! 알려주고, 결제페이지로 다시 보냄.
        set에러발생(true);
        set에러메세지(data.compareOrderAmount.error as string);
      }
    },
  });

  // 서버로 승인 요청
  const onClick = () => {
    // TODO: 원래 진행하고 있던 결제 상세페이지로 !
    if (에러발생) {
      navigate(`/payment`);
    }
    if (승인완료) {
      navigate("/");
    }
  };
  return (
    <div>
      {승인완료 ? (
        <>
          <h1>결제 성공</h1>
          <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
          <div>{`결제 금액: ${Number(
            searchParams.get("amount")
          ).toLocaleString()}원`}</div>
          <div className="p-8" onClick={() => onClick()}>
            완료
          </div>
        </>
      ) : null}
      {에러발생 ? (
        <>
          <h1>결제 실패!</h1>
          <div>결제에 실패하였습니다. 다시 시도해주세요.</div>
          <div>사유: {에러메세지}</div>
          <div className="p-8" onClick={() => onClick()}>
            돌아가기
          </div>
        </>
      ) : null}
    </div>
  );
}
