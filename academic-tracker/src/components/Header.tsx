import "../styles/dashboard.css";

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="logo">Academic Tracker</div>
      <nav className="nav-links">
        <a href="/dashboard">Início</a>
        <a href="/turmas">Turmas</a>
        <a href="/grupos">Grupos</a>
        <a href="/note">Note</a>
        <a href="/atividades">Atividade</a>
        <a href="/perfil">Perfil</a>
      </nav>
    </header>
  );
}
