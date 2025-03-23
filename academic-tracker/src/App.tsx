import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Turmas from "./pages/Turmas";
import Grupos from "./pages/Grupos";
import Atividades from "./pages/Atividades";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.css";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const publicRoutes = ["/", "/cadastro"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  return isPublicPage ? (
    <main className="flex-1 p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {children}
    </main>
  ) : (
    <div className="w-full h-full min-h-screen bg-white text-gray-900">
      {children}
    </div>
  );
}

function AppRoutes() {
  return (
    <LayoutWrapper>
      <Routes>
        {/* 👇 Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* 🔐 Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas"
          element={
            <PrivateRoute>
              <Turmas />
            </PrivateRoute>
          }
        />
        <Route
          path="/grupos"
          element={
            <PrivateRoute>
              <Grupos />
            </PrivateRoute>
          }
        />
        <Route
          path="/atividades"
          element={
            <PrivateRoute>
              <Atividades />
            </PrivateRoute>
          }
        />

        {/* Página padrão */}
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
