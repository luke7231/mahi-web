// AuthContext.tsx
import { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const processIsLoggedIn = () => {
  const token = localStorage.getItem("jwt");
  return Boolean(token);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(processIsLoggedIn);

  const login = () => {
    // 로그인 로직 구현 (예: 사용자 인증)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 로직 구현
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
