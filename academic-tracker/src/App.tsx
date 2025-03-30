import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Turmas from "./pages/Turmas";
import Grupos from "./pages/Grupos";
import Atividades from "./pages/Atividades";
import NotFound from "./pages/NotFound";
import NotePage from "./pages/Note";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header"; 

import "./styles/global.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/dashboard.css"; 

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const publicRoutes = ["/", "/cadastro"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <div className="w-full h-full min-h-screen bg-white text-gray-900">
      {!isPublicPage && <Header />}

      <main className={isPublicPage ? "public-main" : "dashboard-main"}>
        {children}
      </main>
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
          path="/note"
          element={
            <PrivateRoute>
              <NotePage />
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

        {/* Página 404 */}
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
