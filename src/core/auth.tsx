// AuthContext.tsx
import { gql, useMutation } from "@apollo/client";
import { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isFirst: boolean;
  doneOnboarding: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const processIsLoggedIn = () => {
  const token = localStorage.getItem("jwt");
  return Boolean(token);
};

const processIsFirst = () => {
  const onboardingDone = localStorage.getItem("onboarding_done");
  return !Boolean(onboardingDone);
};

const CREATE_PUSH_TOKEN = gql`
  mutation CreateToken($data: CreateTokenInput!) {
    createToken(data: $data) {
      token
      createdAt
    }
  }
`;
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(processIsLoggedIn);
  const [isFirst, setIsFirst] = useState(processIsFirst);
  const [createToken] = useMutation(CREATE_PUSH_TOKEN);

  const login = () => {
    // 로그인 로직 구현 (예: 사용자 인증)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 로직 구현
    setIsLoggedIn(false);
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

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isFirst, doneOnboarding }}
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
