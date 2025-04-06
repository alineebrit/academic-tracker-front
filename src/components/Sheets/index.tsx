import {useEffect, useState} from "react";
import "./style.css";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {IoClose} from "react-icons/io5";
import {Note} from "../../types/Note";
import {notesApi} from "../../service/NoteService";
import NoteCard from "../NoteCard";
const Sheet: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        notesApi.list().then((res) => {
            setNotes(res.data);
        });
    }, []);

    return (
        <>
            <button className="toggle-btn" onClick={() => setOpen(!open)}>
                <ChevronRight fontSize="large" />
            </button>

            <div className={`sheet ${open && "open"}`}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "32px",
                    }}
                >
                    <h2>Listagem de Notas</h2>
                    <div
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <IoClose size={32} />
                    </div>
                </div>
                <div
                    style={{
                        padding: "1rem",
                        display: "flex",
                        gap: "32px",
                        flexDirection: "column",
                        maxHeight: "720px",
                        overflowY: "scroll",
                    }}
                >
                    {notes &&
                        notes.map((note) => <NoteCard note={note}></NoteCard>)}
                </div>
            </div>
        </>
    );
};

export default Sheet;
