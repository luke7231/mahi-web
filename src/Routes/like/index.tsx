import React, { useEffect, useState } from "react";
import { postMessage } from "../../core/message";

const Like = () => {
  const [msg, setMsg] = useState<{ type: string; data: string } | null>(null);

  // rn에서 Webview로 보낸 값을 수신하는 함수
  const listener = (event: any) => {
    console.log("webview listener", event.data);
    const appData = JSON.parse(event.data);
    if (appData.type === "TEST") {
      setMsg(JSON.parse(event.data));
    }
    // else if (appData.type === "IS_APP") {
    //   setIsApp(true);
    // }
  };

  useEffect(() => {
    // android, ios 구분하는 코드
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    receiver.addEventListener("message", listener);
    postMessage("test_to_mobile", "string."); // 테스트입니다.

    // Clean-up 함수: 컴포넌트가 언마운트될 때 실행
    return () => {
      receiver.removeEventListener("message", listener);
    };
  }, []);

  return <div>{msg?.data}</div>;
};

export default Like;
