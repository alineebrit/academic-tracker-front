import "./style.css";

const Header: React.FC = () => {
    return (
        <>
            <header className="dashboard-header">
                <div className="logo-wrapper">
                    <img
                        src="../../../AcademicTrackerWoutBackground.png"
                        alt="Academic Tracker"
                    />
                </div>

                <nav className="nav-links">
                    <a href="/dashboard" title="Home">
                        <img
                            className="icon"
                            src="../../../home.png"
                            alt="Início"
                        />
                    </a>
                    <a href="/turmas" title="Turmas">
                        <img
                            className="icon"
                            src="../../../class.png"
                            alt="Turma"
                        />
                    </a>
                    <a href="/grupos" title="Grupos">
                        <img
                            className="icon"
                            src="../../../group.png"
                            alt="Grupo"
                        />
                    </a>
                    <a href="/notes" title="Anotações">
                        <img
                            className="icon"
                            src="../../../notes.png"
                            alt="Notes"
                        />
                    </a>
                    <a href="/atividades">
                        <img
                            className="icon"
                            src="../../../homework.png"
                            alt="Atividade"
                        />
                    </a>
                    <a href="/perfil">
                        <img
                            className="icon"
                            src="../../../user.png"
                            alt="PErfil"
                        />
                    </a>
                </nav>
            </header>
            <div className="separator"></div>
        </>
    );
};

export default Header;
