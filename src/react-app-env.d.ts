/// <reference types="react-scripts" />
interface Window {
  ReactNativeWebView: {
    postMessage(msg: string, data?: Data): void;
  };
  Kakao: any;
  PaypleCpayAuthCheck: any;
  AUTHNICE: any;
  AppleID: {
    auth: {
      init: (config: ClientConfig) => void;
      signIn: (config?: ClientConfig) => Promise<SigninResponse>;
    };
  };
}

interface ClientConfig {
  clientId: string;
  redirectURI: string;
  scope?: string;
  state?: string;

  nonce?: string;
  usePopup?: boolean;
}

interface Authorization {
  code: string;
  id_token: string;
  state?: string;
}

interface User {
  email: string;
  name: string;
}

interface SigninResponse {
  authorization: Authorization;
  user?: User;
}

interface SigninError {
  error: string;
}
