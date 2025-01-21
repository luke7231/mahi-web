import React, { useState } from "react";
import FadeInWrapper from "../../components/fade-in-wrapper";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import TransitionWrapper from "../../components/common/transition-wrapper";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation 정의
const SEND_AUTH_NUMBER = gql`
  mutation sendAuthNumber($phoneNumber: String!) {
    sendAuthNumber(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;

const VERIFY_AUTH_NUMBER = gql`
  mutation verifyAuthNumber($phoneNumber: String!, $authNumber: String!) {
    verifyAuthNumber(phoneNumber: $phoneNumber, authNumber: $authNumber) {
      ok
      error
    }
  }
`;

const PhoneNumberAuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [showAuthButton, setShowAuthButton] = useState(false);
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [sendAuthNumber] = useMutation(SEND_AUTH_NUMBER);
  const [verifyAuthNumber] = useMutation(VERIFY_AUTH_NUMBER);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setShowAuthButton(value.length === 11);
  };

  const handleSendAuthNumber = async () => {
    setShowAuthInput(true);
    await sendAuthNumber({ variables: { phoneNumber } });
  };

  const handleVerifyAuthNumber = async () => {
    const response = await verifyAuthNumber({
      variables: { phoneNumber, authNumber },
    });
    if (response.data.verifyAuthNumber.ok) {
      alert("인증이 완료되었습니다.");
      navigate("/phone-number-auth-completed");
    } else {
      alert(response.data.verifyAuthNumber.error);
    }
  };

  return (
    <div className="h-full bg-white min-h-screen p-4">
      <FadeInWrapper className="flex flex-col h-full">
        <h1 className="text-3xl text-black font-extrabold mt-4 mb-4">
          휴대폰 번호를 알려주세요
        </h1>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="주문관련 알림을 보내드려요"
          className="border-b p-2 mb-4 w-full focus:outline-none"
          autoFocus
          maxLength={11}
        />
        {showAuthInput && (
          <input
            type="tel"
            value={authNumber}
            onChange={(e) => setAuthNumber(e.target.value)}
            placeholder="인증번호를 입력해주세요"
            className="border-b p-2 mb-4 w-full focus:outline-none"
            autoFocus
            maxLength={6}
          />
        )}
        {showAuthButton && (
          <FadeInWrapper className="inline w-full mt-4">
            <button
              onClick={
                authNumber.length === 6
                  ? handleVerifyAuthNumber
                  : handleSendAuthNumber
              }
              className={`w-full h-[60px] flex items-center justify-center rounded-3xl font-bold ${
                authNumber.length === 6
                  ? "bg-[#C2FC8E] text-black"
                  : "bg-blue-500  text-white"
              }`}
            >
              {authNumber.length === 6 ? "인증번호 검증" : "인증번호 발송"}
            </button>
          </FadeInWrapper>
        )}
      </FadeInWrapper>
    </div>
  );
};

export default PhoneNumberAuthPage;
