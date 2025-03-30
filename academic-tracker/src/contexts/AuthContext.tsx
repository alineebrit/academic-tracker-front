import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("auth", String(isAuthenticated));
  }, [isAuthenticated]);

  function login(email: string, senha: string): boolean {
    if (email === "teste@email.com" && senha === "123456") {
      setIsAuthenticated(true);
      return true;
    } else {
      alert("Email ou senha incorretos!");
      return false;
    }
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
