import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InputProfile from "../components/Input";

export default function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("aluno");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        alert(`Cadastro realizado com sucesso como ${tipoUsuario}!`);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1>Academic Tracker</h1>
                <p
                    style={{
                        marginBottom: "1.5rem",
                        fontWeight: "bold",
                        color: "#18181B",
                    }}
                >
                    Cadastrar {tipoUsuario}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="input-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Digite o seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Matrícula</label>
                        <input
                            type="text"
                            placeholder="Digite sua matrícula"
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Usuário / Email</label>
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
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirme a senha</label>
                        <input
                            type="password"
                            placeholder="Digite novamente a sua senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </div>

                    {}
                    <div className="input-group">
                        <label>Tipo de usuário</label>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            <label>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="aluno"
                                    checked={tipoUsuario === "aluno"}
                                    onChange={() => setTipoUsuario("aluno")}
                                />{" "}
                                Aluno
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="tipo"
                                    value="professor"
                                    checked={tipoUsuario === "professor"}
                                    onChange={() => setTipoUsuario("professor")}
                                />{" "}
                                Professor
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
