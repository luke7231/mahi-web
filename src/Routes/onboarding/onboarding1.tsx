import { useNavigate } from "react-router-dom";
import { postMessage } from "../../core/message";
import { useEffect } from "react";

const Onboarding1 = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    // app
    // postMessage("req_location", "");
    // web
    navigate("/onboarding2");
  };

  // rn에서 Webview로 보낸 값을 수신하는 함수
  const listener = (event: any) => {
    const appData = JSON.parse(event.data);

    if (appData.type === "DONE") {
      navigate("/onboarding2");
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
    <div className="h-[100vh]">
      <div className="h-full flex flex-col items-center justify-between">
        <div></div>
        <div>
          <p className="font-bold text-center mb-4 text-xl">1. 위치 설정</p>
          <p>내 근처 마감 상품을 볼 수 있어요!</p>
        </div>
        <button
          className="text-white font-bold p-3 bg-sky-500 w-full"
          onClick={onClickButton}
        >
          위치 설정
        </button>
      </div>
    </div>
  );
};

export default Onboarding1;
