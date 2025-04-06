import React from "react";
import {useNavigate} from "react-router-dom";
import "./style.css";
import {TiDocumentAdd} from "react-icons/ti";
const FloatingCreateButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/atividades");
    };

    return (
        <button className="floating-create-button" onClick={handleClick}>
            <div className="material-symbols-outlined">
                <TiDocumentAdd size={59} />
            </div>
        </button>
    );
};

export default FloatingCreateButton;
