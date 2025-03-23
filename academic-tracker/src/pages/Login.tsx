import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, senha);
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Academic Tracker</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuário / Email</label>
            <input
              type="email"
              placeholder="Digite o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
  <label>Senha</label>
  <div className="senha-wrapper">
    <input
      type={mostrarSenha ? "text" : "password"}
      placeholder="Digite sua senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required
    />
    <span className="senha-icon" onClick={() => setMostrarSenha(!mostrarSenha)}>
      {mostrarSenha ? <FiEyeOff /> : <FiEye />}
    </span>
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
