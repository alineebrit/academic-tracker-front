import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./styles/global.css";
import "react-datepicker/dist/react-datepicker.css";

import Cadastro from "./pages/Cadastro";

import Atividades from "./pages/Atividade/index";
import NotFound from "./pages/NotFound";
import Note from "./pages/Notes/index";
import Dashboard from "./pages/Dashboard/index";
import PrivateRoute from "./routes/PrivateRoute";
import {AuthProvider} from "./contexts/AuthContext";
import PerfilPage from "./pages/Perfil";
import Login from "./pages/Login";
import Turma from "./pages/Turma";
import GrupoPage from "./pages/Grupo";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />

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
                        <Turma />
                    </PrivateRoute>
                }
            />
            <Route
                path="/grupos"
                element={
                    <PrivateRoute>
                        <GrupoPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/notes"
                element={
                    <PrivateRoute>
                        <Note />
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
            <Route
                path="/perfil"
                element={
                    <PrivateRoute>
                        <PerfilPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;
