import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postMessage } from "../../core/message";
import { useAuth } from "../../core/auth";

const Onboarding2 = () => {
  const navigate = useNavigate();
  const { doneOnboarding } = useAuth();
  const onClickButton = () => {
    // app
    // postMessage("req_notification", "");
    // web
    doneOnboarding();
    navigate("/");
  };

  // rn에서 Webview로 보낸 값을 수신하는 함수
  const listener = (event: any) => {
    const appData = JSON.parse(event.data);

    if (appData.type === "DONE") {
      doneOnboarding();
      navigate("/");
    }
  };

  useEffect(() => {
    // android, ios 구분하는 코드
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    receiver.addEventListener("message", listener);

    // Clean-up 함수: 컴포넌트가 언마운트될 때 실행
    return () => {
      receiver.removeEventListener("message", listener);
    };
  }, []);
  return (
    <div>
      {/* <FadeInWrapper>
        <Image src={"https://feople-eeho.com/image/onboarding2-img.png"} />
      </FadeInWrapper> */}
      <div className="h-[100vh]">
        <div className="h-full flex flex-col items-center justify-between">
          <div></div>
          <div>
            <p className="font-bold text-center mb-4 text-xl">2. 알림 설정</p>
            <p className="text-center">
              마감 상품에 대해 <br />
              제일 먼저 소식을 들을 수 있어요!
            </p>
          </div>
          <button
            className="text-white font-bold p-3 bg-sky-500 w-full"
            onClick={onClickButton}
          >
            알람 설정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
