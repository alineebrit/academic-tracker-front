import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">Academic Tracker</div>
        <nav className="nav-links">
          <a href="/turmas">Turmas</a>
          <a href="/grupos">Grupos</a>
          <a href="/atividades">Acompanhamentos</a>
          <a href="/perfil">Perfil</a>
        </nav>
      </header>

      <main className="dashboard-main">
        <h2>
          Bem-vindo ao <strong>Academic Tracker</strong>
        </h2>
      </main>
    </div>
  );
}
