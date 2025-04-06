import "./style.css";

const Header: React.FC = () => {
    return (
        <>
            <header className="dashboard-header">
                <a className="logo-wrapper" href="/dashboard">
                    <img
                        src="../../../AcademicTrackerWoutBackground.png"
                        alt="Academic Tracker"
                    />
                </a>

                <nav className="nav-links">
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
                    <a href="/perfil">
                        <img
                            className="icon"
                            src="../../../user.png"
                            alt="Perfil"
                        />
                    </a>
                </nav>
            </header>
            <div className="separator"></div>
        </>
    );
};

export default Header;
