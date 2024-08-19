/// <reference types="react-scripts" />
interface Window {
  ReactNativeWebView: {
    postMessage(msg: string, data?: Data): void;
  };
  Kakao: any;
}
