import React, {useRef} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import {IoMdDocument} from "react-icons/io";
import "./style.css";

import {notesApi} from "../../service/NoteService";
import {Note} from "../../types/Note";
type NoteCardProps = {
    note: Note;
    onDelete: (id: number) => void;
};

const NoteCard: React.FC<NoteCardProps> = ({note, onDelete}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleDelete = async () => {
        try {
            await notesApi.remove(note.id);
            onDelete(note.id);
        } catch (err) {
            console.error("Erro ao deletar nota:", err);
        }
    };

    return (
        <div ref={ref} className="note-card">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <IoMdDocument size={24} />
                    <h3 style={{color: "#9dbebb"}}>{note.title}</h3>
                </div>
                <FaRegTrashAlt
                    size={22}
                    color={"#fc0335"}
                    onClick={handleDelete}
                    style={{cursor: "pointer"}}
                />
            </div>

            <p>{note.content}</p>
        </div>
    );
};

export default NoteCard;
