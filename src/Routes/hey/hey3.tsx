import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PayResult {
  PCD_PAY_RST: string; // 결제 요청 결과 (success | error)
  PCD_PAY_MSG: string; // 결제 요청 결과 메시지
  PCD_PAY_OID: string; // 주문 번호
  PCD_PAY_TYPE: string; // 결제 방법 (transfer | card)
  PCD_PAY_WORK: string; // 결제 요청 업무 구분 (CERT | PAY)
  PCD_PAYER_ID?: string; // 결제자 고유 ID (옵션)
  PCD_PAYER_NO?: string; // 가맹점 회원 고유 번호 (옵션)
  PCD_PAY_BANKACCTYPE?: string; // 현금영수증 발행 대상 (개인: personal, 사업자: company)
  PCD_PAYER_NAME?: string; // 결제자 이름
  PCD_PAYER_EMAIL?: string; // 결제자 이메일
  PCD_REGULER_FLAG?: string; // 정기 결제 여부 (Y | N)
  PCD_PAY_YEAR?: string; // 정기 결제 구분 연도
  PCD_PAY_MONTH?: string; // 정기 결제 구분 월
  PCD_PAY_GOODS?: string; // 결제 상품
  PCD_PAY_TOTAL?: number; // 결제 금액
  PCD_PAY_TAXTOTAL?: number; // 부가세 금액 (복합과세 경우)
  PCD_PAY_ISTAX?: string; // 과세 여부 (Y | N)
  PCD_PAY_CARDNAME?: string; // 카드사명
  PCD_PAY_CARDNUM?: string; // 카드 번호
  PCD_PAY_CARDTRADENUM?: string; // 카드 결제 거래 번호
  PCD_PAY_CARDAUTHNO?: string; // 카드 결제 승인 번호
  PCD_PAY_CARDRECEIPT?: string; // 카드 전표 URL
  PCD_PAY_BANK?: string; // 은행 코드 (transfer 결제 시)
  PCD_PAY_BANKNAME?: string; // 은행명 (transfer 결제 시)
  PCD_PAY_BANKNUM?: string; // 계좌 번호 (중간 6자리 * 처리)
  PCD_PAY_TIME?: string; // 결제 시간 (format: yyyyMMddHHmmss)
  PCD_TAXSAVE_RST?: string; // 현금영수증 발행 결과 (Y | N)
  PCD_AUTH_KEY?: string; // 결제용 인증키
  PCD_PAY_REQKEY?: string; // 결제 요청 고유 KEY
  PCD_PAY_COFURL?: string; // 결제 승인 요청 URL
  PCD_REFUND_TOTAL?: number; // 환불 요청 금액 (기존 결제 금액보다 적은 금액 입력 시 부분 취소)
  // 추가 속성 필요시 여기에 정의
}

function Hey3() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payResult, setPayResult] = useState<PayResult>({} as PayResult);
  const [payConfirmVisible, setPayConfirmVisible] = useState(false);
  const [payCancelVisible, setPayCancelVisible] = useState(false);
  const [payConfirmResult, setPayConfirmResult] = useState(null);

  useEffect(() => {
    // payResult를 location에서 가져옴
    const result = location.search
      ? JSON.parse(decodeURIComponent(location.search.substring(1)))
      : location.state && location.state.payResult
      ? location.state.payResult
      : null;

    if (!result) {
      navigate("/");
    } else {
      setPayResult(result);
      if (result.PCD_PAY_WORK === "CERT") {
        setPayConfirmVisible(true);
      }
    }
  }, [location, navigate]);

  const handlePayConfirm = async (e: any) => {
    e.preventDefault();
    if (window.confirm("결제 승인하겠습니까?")) {
      const reqData = {
        PCD_CST_ID: process.env.REACT_APP_CST_ID,
        PCD_CUST_KEY: process.env.REACT_APP_CUST_KEY,
        PCD_AUTH_KEY: payResult.PCD_AUTH_KEY,
        PCD_PAY_TYPE: payResult.PCD_PAY_TYPE,
        PCD_PAYER_ID: payResult.PCD_PAYER_ID,
        PCD_PAY_REQKEY: payResult.PCD_PAY_REQKEY,
      };

      try {
        const response = await axios.post(
          payResult.PCD_PAY_COFURL as string,
          reqData,
          {
            headers: {
              "Content-Type": "application/json",
              Referer: process.env.REACT_APP_HOSTNAME,
            },
          }
        );

        if (response.data.PCD_PAY_MSG) {
          setPayConfirmResult(response.data);
          setPayConfirmVisible(false);
          setPayCancelVisible(true);
        } else {
          window.alert("결제요청실패");
        }
      } catch (error) {
        console.error(error);
        window.alert("결제 요청 중 오류가 발생했습니다.");
      }
    }
  };

  const handlePayRefund = async (e: any) => {
    e.preventDefault();
    if (window.confirm("환불(승인취소)요청을 전송합니다. 진행하시겠습니까?")) {
      try {
        const authResponse = await axios.post("/api/auth", {
          PCD_PAYCANCEL_FLAG: "Y",
        });

        const refundURL = authResponse.data.return_url;
        const reqData = {
          PCD_CST_ID: authResponse.data.cst_id,
          PCD_CUST_KEY: authResponse.data.custKey,
          PCD_AUTH_KEY: authResponse.data.AuthKey,
          PCD_REFUND_KEY: process.env.REACT_APP_PCD_REFUND_KEY,
          PCD_PAYCANCEL_FLAG: "Y",
          PCD_PAY_OID: payResult.PCD_PAY_OID,
          PCD_PAY_DATE: payResult?.PCD_PAY_TIME?.substring(0, 8),
          PCD_REFUND_TOTAL: payResult.PCD_REFUND_TOTAL,
          PCD_REGULER_FLAG: payResult.PCD_REGULER_FLAG,
          PCD_PAY_YEAR: payResult.PCD_PAY_YEAR,
          PCD_PAY_MONTH: payResult.PCD_PAY_MONTH,
        };

        const refundResponse = await axios.post(refundURL, reqData, {
          headers: {
            "Content-Type": "application/json",
            Referer: process.env.REACT_APP_HOSTNAME,
          },
        });

        if (refundResponse.data.PCD_PAY_MSG) {
          setPayConfirmResult(refundResponse.data);
          setPayCancelVisible(false);
          window.alert("환불(승인취소)요청 성공");
        } else {
          window.alert("환불(승인취소)요청 실패");
        }
      } catch (error) {
        console.error(error);
        window.alert("환불 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      {payResult && (
        <div style={{ border: "1px solid black", width: "800px" }}>
          {/* 결제 정보 표시 */}
          <div>PCD_PAY_RST = {payResult.PCD_PAY_RST}</div>
          <div>PCD_PAY_MSG = {payResult.PCD_PAY_MSG}</div>
          <div>PCD_PAY_OID = {payResult.PCD_PAY_OID}</div>
          <div>PCD_PAY_TYPE = {payResult.PCD_PAY_TYPE}</div>
          {/* 추가 결제 정보 */}
          {/* ... */}
        </div>
      )}

      {payConfirmVisible && (
        <div>
          <button onClick={handlePayConfirm}>결제승인요청</button>
        </div>
      )}

      {payCancelVisible && (
        <div>
          <button onClick={handlePayRefund}>결제승인취소</button>
        </div>
      )}

      {payConfirmResult && (
        <div id="payConfirmResult">
          <p>
            <strong>결제 요청 결과</strong>
          </p>
          <table>
            <tbody>
              {Object.entries(payConfirmResult).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>: {value as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form id="payConfirm">
        <input
          type="hidden"
          name="PCD_PAY_TYPE"
          value={payResult ? payResult.PCD_PAY_TYPE : ""}
        />
        <input
          type="hidden"
          name="PCD_AUTH_KEY"
          value={payResult ? payResult.PCD_AUTH_KEY : ""}
        />
        <input
          type="hidden"
          name="PCD_PAYER_ID"
          value={payResult ? payResult.PCD_PAYER_ID : ""}
        />
        <input
          type="hidden"
          name="PCD_PAY_REQKEY"
          value={payResult ? payResult.PCD_PAY_REQKEY : ""}
        />
        <input
          type="hidden"
          name="PCD_PAY_COFURL"
          value={payResult ? payResult.PCD_PAY_COFURL : ""}
        />
      </form>
    </div>
  );
}

export default Hey3;
