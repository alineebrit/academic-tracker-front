import {useState, useRef, FormEvent} from "react";
import {FilePlus} from "lucide-react";
import Header from "../../components/Header";

export interface Note {
    id: number;
    grupoId: number;
    createdAt: Date;
    title: string;
    content: string | null;
}

export default function Note() {
    const [notes, setnotes] = useState<Note[]>([]);
    const [noteForm, setNoteForm] = useState<Partial<Note>>({
        title: "",
        grupoId: 0,
        content: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setNoteForm((prev) => ({
            ...prev,
            [name]: name === "grupoId" ? Number(value) : value,
        }));

        if (name === "content" && textareaRef.current) {
            textareaRef.current.style.height = "40px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!noteForm.title || noteForm.grupoId === undefined) {
            alert("Preencha título e grupo ID.");
            return;
        }

        if (editingId !== null) {
            setnotes((prev) =>
                prev.map((n) =>
                    n.id === editingId ? ({...n, ...noteForm} as Note) : n
                )
            );
            setEditingId(null);
        } else {
            const novanote: Note = {
                id: Date.now(),
                title: noteForm.title!,
                grupoId: noteForm.grupoId!,
                content: noteForm.content || "",
                createdAt: new Date(),
            };
            setnotes((prev) => [...prev, novanote]);
        }

        setNoteForm({title: "", grupoId: 0, content: ""});

        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
        }
    };

    const handleEditar = (note: Note) => {
        setNoteForm({
            title: note.title,
            grupoId: note.grupoId,
            content: note.content,
        });
        setEditingId(note.id);

        if (textareaRef.current) {
            setTimeout(() => {
                textareaRef.current!.style.height = "40px";
                textareaRef.current!.style.height = `${
                    textareaRef.current!.scrollHeight
                }px`;
            }, 0);
        }
    };

    const handleExcluir = (id: number) => {
        if (confirm("Deseja excluir esta note?")) {
            setnotes((prev) => prev.filter((n) => n.id !== id));
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="login-box">
                    <div
                        className="note-header"
                        style={{
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <FilePlus size={24} />
                        <h2>{editingId ? "Editar note" : "Criar note"}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="atividades-form">
                        <div className="input-group">
                            <label>Título *</label>
                            <input
                                type="text"
                                name="title"
                                value={noteForm.title || ""}
                                onChange={handleChange}
                                placeholder="Digite o título"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Grupo ID *</label>
                            <input
                                type="number"
                                name="grupoId"
                                value={noteForm.grupoId ?? ""}
                                onChange={handleChange}
                                placeholder="Digite o ID do grupo"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Conteúdo</label>
                            <textarea
                                name="content"
                                value={noteForm.content || ""}
                                onChange={handleChange}
                                placeholder="Digite o conteúdo..."
                                ref={textareaRef}
                                rows={3}
                            />
                        </div>

                        <button type="submit" className="salvar-atividade">
                            {editingId ? "Atualizar note" : "Salvar note"}
                        </button>
                    </form>
                </div>

                {notes.length > 0 && (
                    <div
                        style={{
                            marginTop: "2rem",
                            textAlign: "left",
                            width: "100%",
                            maxWidth: "600px",
                        }}
                    >
                        <h3>📝 notes Criadas:</h3>
                        <ul>
                            {notes.map((n) => (
                                <li
                                    key={n.id}
                                    style={{
                                        marginBottom: "1rem",
                                        padding: "0.75rem",
                                        backgroundColor: "#f9fafb",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <strong>{n.title}</strong>
                                    <br />
                                    Grupo: {n.grupoId}
                                    <br />
                                    {n.content || "Sem conteúdo"}
                                    <div
                                        style={{
                                            marginTop: "0.5rem",
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <button onClick={() => handleEditar(n)}>
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => handleExcluir(n.id)}
                                        >
                                            🗑️ Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
