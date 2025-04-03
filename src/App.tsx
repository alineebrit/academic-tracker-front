import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./styles/global.css";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Turmas from "./pages/Turmas";
import Grupos from "./pages/Grupos";
import Atividades from "./pages/Atividade/index";
import NotFound from "./pages/NotFound";
import Note from "./pages/Notes/index";

import PrivateRoute from "./routes/PrivateRoute";
import {AuthProvider} from "./contexts/AuthContext";
// import Header from "./components/Header/index";

// function LayoutWrapper({children}: {children: React.ReactNode}) {
//     const location = useLocation();
//     const publicRoutes = ["/", "/cadastro"];
//     const isPublicPage = publicRoutes.includes(location.pathname);

//     return (
//         <div className="w-full h-full min-h-screen bg-white text-gray-900">
//             {!isPublicPage && <Header />}

//             <main className={isPublicPage ? "public-main" : "dashboard-main"}>
//                 {children}
//             </main>
//         </div>
//     );
// }

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
                path="/turma"
                element={
                    <PrivateRoute>
                        <Turmas />
                    </PrivateRoute>
                }
            />
            <Route
                path="/grupo"
                element={
                    <PrivateRoute>
                        <Grupos />
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
