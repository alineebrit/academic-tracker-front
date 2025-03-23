import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  function login(email: string, senha: string) {
    if (email === "teste@email.com" && senha === "123456") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Email ou senha incorretos!");
    }
  }

  function logout() {
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
