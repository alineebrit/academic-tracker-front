import {useState} from "react";
import "./style.css";
import ChevronRight from "@mui/icons-material/ChevronRight";
const Sheet = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="toggle-btn" onClick={() => setOpen(!open)}>
                <ChevronRight fontSize="large" />
            </button>

            <div className={`sheet ${open ? "open" : ""}`}>
                <h2>Menu Lateral</h2>
                <p>Conteúdo do Sheet...</p>
                <button onClick={() => setOpen(false)}>Fechar</button>
            </div>
        </>
    );
};

export default Sheet;
