import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/auth";
import { gql, useMutation } from "@apollo/client";
import BottomTab from "../../../components/bottom-tab";
import Header from "../../../components/common/header";
import { useState } from "react";
import Modal from "../../../components/common/modal";
import useAmplitudeContext from "../../../core/use-amplitude";

const KAKAO_DELETE_USER = gql`
  mutation KakaoDeleteUser {
    kakaoDeleteUser {
      ok
      error
    }
  }
`;
const APPLE_DELETE_USER = gql`
  mutation AppleDeleteUser($code: String!) {
    appleDeleteUser(code: $code) {
      ok
      error
    }
  }
`;
const PURE_DELETE_USER = gql`
  mutation PureDeleteUser {
    pureDeleteUser {
      ok
      error
    }
  }
`;
const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [kakaoDeleteUser, { error }] = useMutation(KAKAO_DELETE_USER);
  const [appleDeleteUser, { error: appleError }] =
    useMutation(APPLE_DELETE_USER);
  const [pureDeleteUser] = useMutation(PURE_DELETE_USER);

  async function onClickDelete() {
    const isKakao = localStorage.getItem("isKakao");
    const isApple = localStorage.getItem("isApple");
    console.log(isApple);
    if (isKakao) {
      kakaoDeleteUser({
        onCompleted: (data) => {
          if (data.kakaoDeleteUser.ok) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("isKakao");
            logout();
            navigate("/");
          }
        },
      });
    } else if (isApple) {
      console.log("sign in with apple");

      window.AppleID.auth.init({
        clientId: "com.luke7299.mahi-sign-in",
        scope: "email",
        redirectURI: `${process.env.REACT_APP_URL}/apple-auth`,
        state: "hey",
        usePopup: true,
      });

      try {
        const res = await window.AppleID.auth.signIn();
        if (res) {
          const code = res.authorization.code;
          appleDeleteUser({
            variables: {
              code,
            },
            onCompleted: (data) => {
              if (data.appleDeleteUser.ok) {
                localStorage.removeItem("jwt");
                logout();
                navigate("/");
              }
            },
          });
        }
      } catch (e) {
        console.log(error);
      }
    } else {
      pureDeleteUser({
        onCompleted: (data) => {
          if (data.pureDeleteUser.ok) {
            localStorage.removeItem("jwt");
            logout();
            navigate("/");
          }
        },
      });
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("이유를 선택해주세요");
  const options = [
    "메뉴가 한정적이에요.",
    "매장 수가 너무 적어요.",
    "우리 동네 근처에 매장이 없어요.",
    "앱에 버그가 너무 많아요.",
    "기타",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Update the selected option
    setIsOpen(false); // Close the dropdown
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <div className="w-full h-[100vh]  flex flex-col justify-between">
      <div>
        <Header title="탈퇴하기" showBackButton />

        <div className="mt-12 px-4">
          <div className="mb-[10px] text-black text-3xl font-semibold font-['Pretendard'] leading-[31.20px]">
            고객님과의 이별인가요?
            <br />
            너무 아쉬워요.
          </div>
          <div className="mb-[10px]  h-14 text-black text-md font-normal font-['Pretendard'] leading-[21px]">
            지금까지 저희 마감히어로를 사랑해주셔서 감사합니다.
            <br />
            부족한 점이 있었다면 누구보다 빠르게 개선하도록 하겠습니다.
          </div>
          <div className="mb-[10px] text-black text-md font-semibold font-['Pretendard'] leading-[21px]">
            계정을 삭제하려는 이유가 궁금해요.
          </div>
          <div
            onClick={toggleDropdown}
            className="relative flex items-center justify-between w-full max-w-[335px] h-[54px] rounded-lg border border-[#757575] p-4"
          >
            <div className="text-[#c4c4c4] text-sm font-normal font-['Pretendard'] leading-[21px]">
              {selectedOption}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M14.25 6.75L9 12L3.75 6.75"
                stroke="#757575"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {isOpen && (
            <div className="mt-2 bg-white border border-[#757575] rounded-lg shadow-lg">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)} // Set selected option and close dropdown
                  className="px-4 py-2 text-sm text-[#757575] hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <div className="px-4 flex justify-center w-full mb-[80px]">
        <button
          onClick={toggleModal}
          className="w-full max-w-[430px] h-[54px] bg-[#757575] text-white rounded-lg border border-[#757575] hover:bg-[#636363] transition-colors"
        >
          제출하기
        </button>
      </div>
      <BottomTab />
      <Modal
        isOpen={isOpenModal}
        title="정말 탈퇴하시겠습니까?"
        onYes={() => {
          trackAmplitudeEvent("계정탈퇴", { reason: selectedOption });
          onClickDelete();
        }}
        onClose={toggleModal}
      />
    </div>
  );
};

export default SignOut;
