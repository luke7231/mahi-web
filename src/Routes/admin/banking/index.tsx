import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import Header from "../../../components/common/header";

// GraphQL Mutation to update settlement info
const UPDATE_SETTLEMENT_INFO = gql`
  mutation UpdateSettlementInfo(
    $bank: String
    $accountHolder: String
    $accountNumber: String
    $businessNumber: String
  ) {
    updateSettlementInfo(
      bank: $bank
      accountHolder: $accountHolder
      accountNumber: $accountNumber
      businessNumber: $businessNumber
    ) {
      ok
      error
    }
  }
`;

const bankList = [
  "국민은행",
  "우리은행",
  "신한은행",
  "기업은행",
  "하나은행",
  "농협은행",
  "지역농축협",
  "SC은행",
  "한국씨티은행",
  "우체국",
  "카카오뱅크",
  "토스뱅크",
  "케이뱅크",
  "경남은행",
  "광주은행",
  "IM[구 대구은행]",
  "도이치",
  "부산은행",
  "산림조합",
  "산업은행",
  "저축은행",
  "새마을금고",
  "수협",
  "신협",
  "전북은행",
  "제주은행",
];

const GET_SELLER_INFO = gql`
  query GetSellerInfo {
    seller {
      id
      bank
      accountHolder
      accountNumber
    }
  }
`;

const SettlementInfoForm = () => {
  const { data, loading: queryLoading } = useQuery(GET_SELLER_INFO);
  const [bank, setBank] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [updateSettlementInfo, { loading: mutationLoading }] = useMutation(
    UPDATE_SETTLEMENT_INFO
  );
  const [errorMessage, setErrorMessage] = useState("");

  // 정산 정보를 가져왔을 때 초기값을 설정
  useEffect(() => {
    if (data?.seller) {
      setBank(data.seller.bank || "");
      setAccountHolder(data.seller.accountHolder || "");
      setAccountNumber(data.seller.accountNumber || "");
      setBusinessNumber(data.seller.businessNumber || "");
    }
  }, [data]);

  const handleSubmit = () => {
    // 입력 값 검증
    if (!bank || !accountHolder || !accountNumber || !businessNumber) {
      setErrorMessage("모든 필수 항목을 입력해주세요.");
      return;
    }

    updateSettlementInfo({
      variables: {
        bank,
        accountHolder,
        accountNumber,
        businessNumber,
      },
    })
      .then(() => {
        alert("정산 정보가 성공적으로 업데이트되었습니다.");
        setErrorMessage("");
      })
      .catch((err) => {
        console.error("정산 정보 업데이트 중 오류 발생:", err);
        setErrorMessage("정산 정보 업데이트 중 오류가 발생했습니다.");
      });
  };

  if (queryLoading) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      <Header title="매장정보" showBackButton />
      <div className="max-w-xl mx-auto bg-white w-full p-6 rounded-lg shadow-md mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">정산 정보 입력</h2>

        {/* 안내 문구 추가 */}
        <p className="text-md text-gray-600">
          * 정산받을 계좌는{" "}
          <span className="text-red-600">
            반드시 사업자 등록증의 명의와 동일해야
          </span>{" "}
          합니다.
        </p>
        <p className="text-md text-gray-600 mb-4">
          * 정산금액에 대해서는 직접 부가가치세 신고를 하셔야 합니다.
        </p>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700 font-semibold">
            은행명
          </label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">은행을 선택해주세요</option>
            {bankList.map((bankName, index) => (
              <option key={index} value={bankName}>
                {bankName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700 font-semibold">
            예금주명
          </label>
          <input
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700 font-semibold">
            계좌번호(짝대기 생략!)
          </label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="000000000000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700 font-semibold">
            사업자 등록번호(짝대기 생략!)
          </label>
          <input
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
            placeholder="000000000000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg"
          disabled={mutationLoading} // 로딩 중일 때 버튼 비활성화
        >
          {mutationLoading ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
};

export default SettlementInfoForm;
