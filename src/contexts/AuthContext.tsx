import {createContext, useState, useEffect, ReactNode} from "react";
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({children}: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("token");
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    async function login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    password,
                }
            );

            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                setIsAuthenticated(true);
                return true;
            } else {
                alert("Login falhou: token ausente.");
                return false;
            }
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Email ou senha inválidos!");
            return false;
        }
    }

    function logout() {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
