import {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {FiEye, FiEyeOff} from "react-icons/fi";
import "./style.css";
import InputProfile from "../../components/Input";

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const sucesso = await login(email, password).then((e) => e);
        if (sucesso) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <div className="logo-wrapper">
                    <img
                        src="../../../AcademicTrackerWoutBackground.png"
                        alt="Academic Tracker"
                    />
                </div>

                <form onSubmit={handleSubmit} style={{marginTop: "20px"}}>
                    <div className="input-group">
                        <InputProfile
                            type="email"
                            label="Usuário / Email"
                            placeholder="Digite o seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-group">
                            <InputProfile
                                type={mostrarSenha ? "text" : "password"}
                                label="Senha"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="button">
                        Entrar
                    </button>
                </form>

                <p className="register" onClick={() => navigate("/cadastro")}>
                    Quero me cadastrar
                </p>
            </div>
        </div>
    );
}
