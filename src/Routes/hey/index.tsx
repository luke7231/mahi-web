import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function OrderForm() {
  // 상태 선언

  const [payType, setPayType] = useState("");
  const [cardVer, setCardVer] = useState("");
  const navigate = useNavigate();
  const content = useRef<any>({
    // Default form set
    is_direct: "N", // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: "transfer", // 결제수단
    work_type: "CERT", // 결제요청방식
    card_ver: "", // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: "", // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: "2335", // 가맹점 회원 고유번호
    buyer_name: "홍길동", // 결제자 이름
    buyer_hp: "01012345678", // 결제자 휴대폰 번호
    buyer_email: "test@payple.kr", // 결제자 Email
    buy_goods: "휴대폰", // 결제 상품
    buy_total: "1000", // 결제 금액
    buy_istax: "Y", // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: "", // 부가세(복합과세인 경우 필수)
    order_num: nanoid(), // 주문번호
    pay_year: "", // [정기결제] 결제 구분 년도
    pay_month: "", // [정기결제] 결제 구분 월
    is_reguler: "N", // 정기결제 여부 (Y | N)
    is_taxsave: "N", // 현금영수증 발행여부
    simple_flag: "N", // 간편결제 여부
    auth_type: "sms", // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
  });

  const handleChange = (e: any) => {
    console.log(content);
    content.current[e.target.name] = e.target.value;
  };

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    // navigate("/order_confirm", {
    //   state: { content: content.current },
    // });
    // S2_7edb63a062cd4f799d14caa983faab78
    function serverAuth() {
      window.AUTHNICE.requestPay({
        clientId: "S2_7edb63a062cd4f799d14caa983faab78",
        method: "card",
        orderId: nanoid(),
        amount: 1004,
        appScheme: "mahi://",
        fnError: () => console.error(),
        goodsName: "나이스페이-상품",
        returnUrl: "http://172.25.80.176:4000/nice-auth",
      });
    }
    serverAuth();
  };
  // `pay_type`이 변경될 때 상태 업데이트
  useEffect(() => {
    if (payType === "card") {
      setCardVer(""); // 카드 선택 시 초기화
    }
  }, [payType]);

  return (
    <div>
      <form id="orderForm" name="orderForm" onChange={handleChange}>
        <div>
          <select name="simple_flag">
            <option value="N">단건결제</option>
            <option value="Y">간편결제</option>
          </select>
        </div>
        <div>
          <select name="is_direct">
            <option value="N">POPUP</option>
            <option value="Y">DIRECT</option>
          </select>
        </div>
        <div>
          <span>
            <select
              id="pay_type"
              name="pay_type"
              value={payType}
              onChange={(e) => setPayType(e.target.value)}
            >
              <option value="transfer">계좌이체결제</option>
              <option value="card">신용카드</option>
            </select>
          </span>
          {payType === "card" && (
            <span id="card_ver_view">
              <select
                id="card_ver"
                name="card_ver"
                value={cardVer}
                onChange={(e) => setCardVer(e.target.value)}
              >
                {/* <option value="">=결제창 선택=</option> */}
                {/* <option value="01">카드 정기</option> */}
                <option value="02">카드 일반</option>
              </select>
            </span>
          )}
        </div>

        {/* 나머지 form 요소들 */}

        {payType !== "card" && (
          <div id="taxsave_view">
            <label htmlFor="is_taxsave">현금영수증</label>
            <select id="is_taxsave" name="is_taxsave">
              <option value="N">N</option>
              <option value="Y">Y</option>
            </select>
          </div>
        )}

        {cardVer === "01" && (
          <>
            <div id="is_reguler_view">
              <label htmlFor="is_reguler">정기결제</label>
              <select id="is_reguler" name="is_reguler">
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </div>
            <div id="pay_year_view">
              <label htmlFor="pay_year">정기결제 구분년도</label>
              <select id="pay_year" name="pay_year">
                <option value="">===</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
            <div id="pay_month_view">
              <label htmlFor="pay_month">정기결제 구분월</label>
              <select id="pay_month" name="pay_month">
                <option value="">===</option>
                <option value="12">12</option>
                <option value="11">11</option>
                {/* 나머지 월 옵션들 */}
              </select>
            </div>
          </>
        )}

        <div>
          <label htmlFor="work_type">결제요청방식</label>
          <select id="work_type" name="work_type" disabled={cardVer !== "01"}>
            <option value="CERT">결제요청-결제확인-{">"}결제완료</option>
            <option value="PAY">결제요청-{">"}결제완료</option>
            <option value="AUTH">인증</option>
          </select>
        </div>

        {/* 추가 폼 요소들 */}
      </form>
      <button id="orderFormSubmit" onClick={handleSubmit}>
        상품구매
      </button>
    </div>
  );
}

export default OrderForm;
