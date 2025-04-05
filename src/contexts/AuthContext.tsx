import {createContext, useState, useEffect, ReactNode} from "react";
import axios from "axios";
import {User} from "../types/User";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
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

    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [isAuthenticated, user]);

    async function login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email,
                    password,
                }
            );

            const {token, user} = response.data;

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (token && user) {
                localStorage.setItem("token", token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                setIsAuthenticated(true);
                setUser(user);
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
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
