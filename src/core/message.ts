// webview에서 rn으로 값을 송신하는 함수
export const postMessage = (type: string, data: any) => {
  if (!window.ReactNativeWebView) {
    // 이 값이 없는 경우 모바일이 아니다.
    return;
  }
  window.ReactNativeWebView?.postMessage(JSON.stringify({ type, data }));
};

// 이렇게 사용한다.
// 추상화를 하지 않은이유: 1. 일단 리스너 자체가 컴포넌트에 종속될 수 있음. => 그냥 예시만 남겨놓자.
// 이렇게 복붙해서 쓰세요~
// rn에서 Webview로 보낸 값을 수신하는 함수
//   const listener = (event: any) => {
//     console.log("webview listener", event.data);
//     const appData = JSON.parse(event.data);
//     if (appData.type === "TEST") {
//       setMsg(JSON.parse(event.data));
//     } else if (appData.type === "IS_APP") {
//       setIsApp(true);
//     }
//   };
