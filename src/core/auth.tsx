// AuthContext.tsx
import { gql, useMutation } from "@apollo/client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isFirst: boolean;
  doneOnboarding: () => void;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  lastPage: string | null;
  changeLastPage: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const processIsLoggedIn = () => {
  const token = localStorage.getItem("jwt");
  return Boolean(token);
};

const processIsAdminLoggedIn = () => {
  const token = localStorage.getItem("sellerToken");
  return Boolean(token);
};

const processIsFirst = () => {
  const onboardingDone = localStorage.getItem("onboarding_done");
  return !Boolean(onboardingDone);
};

const processLastPage = () => {
  const lastPage = localStorage.getItem("lastPage");
  return lastPage;
};

const CREATE_PUSH_TOKEN = gql`
  mutation CreateToken($data: CreateTokenInput!) {
    createToken(data: $data) {
      token
      createdAt
    }
  }
`;
const SET_TOKEN_TO_USER = gql`
  mutation SetTokenToUser($push_token: String!) {
    setTokenToUser(push_token: $push_token)
  }
`;
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(processIsLoggedIn);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    processIsAdminLoggedIn
  );
  const [isFirst, setIsFirst] = useState(processIsFirst);
  const [lastPage, setLastPage] = useState<string | "seller" | "client" | null>(
    processLastPage
  );
  const [createToken] = useMutation(CREATE_PUSH_TOKEN);
  const [setTokenToUser] = useMutation(SET_TOKEN_TO_USER);

  const login = () => {
    // 로그인 로직 구현 (예: 사용자 인증)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 로직 구현
    setIsLoggedIn(false);
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
  };
  const logoutAdmin = () => {
    // 로그아웃 로직 구현
    setIsAdminLoggedIn(false);
  };

  const changeLastPage = () => {
    const current = localStorage.getItem("lastPage");
    if (current === "seller") {
      localStorage.setItem("lastPage", "client");
      setLastPage("client");
    } else {
      localStorage.setItem("lastPage", "seller");
      setLastPage("seller");
    }
  };

  const doneOnboarding = () => {
    localStorage.setItem("onboarding_done", "true");

    // 온보딩이 끝날 때, 로컬스토리지에 저장해두었던 푸시토큰을 서버에 보내어 DB에 저장한다.
    const token = localStorage.getItem("expo_push_token");
    if (token) {
      createToken({
        variables: {
          data: {
            token,
          },
        },
      });
    }
    setIsFirst(false);
  };

  useEffect(() => {
    const push_token = localStorage.getItem("expo_push_token");
    const jwt = localStorage.getItem("jwt");
    // const isServerSet = localStorage.getItem("isServerSet");
    if (push_token && jwt) {
      //  로그인하고 푸시토큰 했으면 무조건 보내는 건?
      setTokenToUser({
        variables: {
          push_token,
        },
      });
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isFirst,
        doneOnboarding,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        lastPage,
        changeLastPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
