import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
interface PaymentObject {
  PCD_PAY_TYPE?: string; // 결제 방법 (transfer | card)
  PCD_PAY_WORK?: string; // 결제요청 업무구분 (AUTH | CERT | PAY)
  PCD_CARD_VER?: string; // 카드결제 시 필수 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼)
  PCD_PAYER_AUTHTYPE?: string; // 본인인증 방식 (sms | pwd)
  PCD_RST_URL?: string; // 결제(요청)결과 RETURN URL
  callbackFunction?: (res: any) => void; // 결과를 받는 callback 함수
  PCD_PAYER_NO?: string; // 가맹점 회원 고유번호
  PCD_PAYER_NAME?: string; // 결제자 이름
  PCD_PAYER_HP?: string; // 결제자 휴대폰 번호
  PCD_PAYER_EMAIL?: string; // 결제자 Email
  PCD_TAXSAVE_FLAG?: string; // 현금영수증 발행여부 (Y|N)
  PCD_REGULER_FLAG?: string; // 정기결제 여부 (Y|N)
  PCD_SIMPLE_FLAG?: string; // 간편결제 여부 (Y|N)
  PCD_PAY_GOODS?: string; // 결제 상품명
  PCD_PAY_TOTAL?: number; // 결제 금액
  PCD_PAY_TAXTOTAL?: number; // 부가세 금액
  PCD_PAY_ISTAX?: string; // 과세여부 (과세: Y | 비과세: N)
  PCD_PAY_OID?: string; // 주문번호
  PCD_PAY_YEAR?: string; // [정기결제] 결제 구분 년도
  PCD_PAY_MONTH?: string; // [정기결제] 결제 구분 월
  PCD_PAYER_ID?: string; // 결제자 고유ID (간편결제 시 사용)
  PCD_APP_SCHEME?: string;
  clientKey?: string; // 파트너 인증을 위한 클라이언트 키
}
function Hey2() {
  // 뒤로가기 버튼 클릭 이벤트 발생시 결제창 화면 닫음
  // useEffect(() => {
  //   const handlePopState = (e) => {
  //     if (e) {
  //       window.MainBodyAction("close");
  //     }
  //   };

  //   window.addEventListener("popstate", handlePopState);

  //   // cleanup function
  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);
  useEffect(() => {
    // 외부 스크립트가 로드된 후 함수 사용 가능
    if (window.PaypleCpayAuthCheck) {
      console.log("Payple script loaded and available.");
    } else {
      console.error("Payple script not available.");
    }
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const content =
    location.state && location.state.content ? location.state.content : null;

  let [payResult] = useState({});

  /* 결과를 받고자 하는 callback 함수 (callback 함수를 설정할 경우 PCD_RST_URL 이 작동하지 않음)
   * ref: https://developer.payple.kr/service/faq
   */

  /*
   *  연동방식별 파라미터 세팅 ('결제하기' 버튼 클릭시 호출)
   */
  function getResult(res: any) {
    alert(res);
  }
  const handleClick = (e: any) => {
    e.preventDefault();
    const obj: PaymentObject = {};
    // callbackFunction 설정
    obj.callbackFunction = getResult;
    // 공통 설정
    obj.PCD_PAY_TYPE = content.pay_type;
    obj.PCD_PAY_WORK = content.work_type;
    if (content.pay_type === "card")
      obj.PCD_CARD_VER = content.card_ver || "02";
    obj.PCD_PAYER_AUTHTYPE = content.auth_type;

    // IOS, AOS앱 및 인앱브라우저에서는 결제창 호출 방식을 다이렉트로 연결해 주세요.
    if (content.is_direct === "Y") {
      obj.PCD_RST_URL = process.env.REACT_APP_API_URL + "/payple-auth";
    } else {
      obj.PCD_RST_URL = "/react/order_result";
    }

    // 조건에 따른 파라미터 설정
    if (content.pay_type === "AUTH") {
      obj.PCD_PAYER_NO = content.buyer_no;
      obj.PCD_PAYER_NAME = content.buyer_name;
      obj.PCD_PAYER_HP = content.buyer_hp;
      obj.PCD_PAYER_EMAIL = content.buyer_email;
      obj.PCD_TAXSAVE_FLAG = content.is_taxsave;
      obj.PCD_REGULER_FLAG = content.is_reguler;
      obj.PCD_SIMPLE_FLAG = content.simple_flag;
    } else {
      if (content.simple_flag !== "Y" || content.payple_payer_id === "") {
        obj.PCD_PAYER_NO = content.buyer_no;
        obj.PCD_PAYER_NAME = content.buyer_name;
        obj.PCD_PAYER_HP = content.buyer_hp;
        obj.PCD_PAYER_EMAIL = content.buyer_email;
        obj.PCD_PAY_GOODS = content.buy_goods;
        obj.PCD_PAY_TOTAL = content.buy_total;
        obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal;
        obj.PCD_PAY_ISTAX = content.buy_istax;
        obj.PCD_PAY_OID = content.order_num;
        obj.PCD_REGULER_FLAG = content.is_reguler;
        obj.PCD_PAY_YEAR = content.pay_year;
        obj.PCD_PAY_MONTH = content.pay_month;
        obj.PCD_TAXSAVE_FLAG = content.is_taxsave;
      } else if (
        content.simple_flag === "Y" &&
        content.payple_payer_id !== ""
      ) {
        obj.PCD_SIMPLE_FLAG = content.simple_flag;
        obj.PCD_PAYER_ID = content.payple_payer_id;
        obj.PCD_PAYER_NO = content.buyer_no;
        obj.PCD_PAY_GOODS = content.buy_goods;
        obj.PCD_PAY_TOTAL = content.buy_total;
        obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal;
        obj.PCD_PAY_ISTAX = content.buy_istax;
        obj.PCD_PAY_OID = content.order_num;
        obj.PCD_REGULER_FLAG = content.is_reguler;
        obj.PCD_PAY_YEAR = content.pay_year;
        obj.PCD_PAY_MONTH = content.pay_month;
        obj.PCD_TAXSAVE_FLAG = content.is_taxsave;
      }
    }

    // 파트너 인증 - 클라이언트 키(clientKey)
    obj.PCD_APP_SCHEME = "mahi://";
    obj.clientKey = "test_DF55F29DA654A8CBC0F0A9DD4B556486";
    window.PaypleCpayAuthCheck(obj);
  };

  return (
    <div>
      <table border={1} cellSpacing="0" cellPadding="1">
        <tbody>
          <tr>
            <td>구매자 이름</td>
            <td>{content.buyer_name}</td>
          </tr>
          <tr>
            <td>구매자 휴대폰번호</td>
            <td>{content.buyer_hp}</td>
          </tr>
          <tr>
            <td>구매자 Email</td>
            <td>{content.buyer_email}</td>
          </tr>
          <tr>
            <td>구매상품</td>
            <td>{content.buy_goods}</td>
          </tr>
          <tr>
            <td>결제금액</td>
            <td>{content.buy_total}</td>
          </tr>
          <tr>
            <td>과세여부</td>
            <td>{content.buy_istax}</td>
          </tr>
          <tr>
            <td>주문번호</td>
            <td>{content.order_num}</td>
          </tr>
          <tr>
            <td>정기결제</td>
            <td>{content.is_reguler}</td>
          </tr>
          <tr>
            <td>정기결제 구분년도</td>
            <td>{content.pay_year}</td>
          </tr>
          <tr>
            <td>정기결제 구분월</td>
            <td>{content.pay_month}</td>
          </tr>
          <tr>
            <td>현금영수증</td>
            <td>{content.is_taxsave}</td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <button id="payAction" onClick={handleClick}>
                결제하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Hey2;
