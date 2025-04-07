import React, {useState, useContext} from "react";
import {notesApi} from "../../service/NoteService";
import {AuthContext} from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";

const CreateNoteForm = () => {
    const auth = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [grupoId, setGrupoId] = useState<number | null | undefined>(
        auth?.user?.grupoId
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await notesApi.create({
                title,
                content,
                grupoId: Number(grupoId),
            });

            alert("Nota criada com sucesso!");

            setTitle("");
            setContent("");
        } catch (err) {
            console.error("Erro ao criar nota", err);
            alert("Erro ao criar a nota.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header></Header>
            <Sheet></Sheet>
            <div style={{padding: "2rem", maxWidth: "600px", margin: "0 auto"}}>
                <h2 style={{marginBottom: "1rem", fontSize: "1.5rem"}}>
                    Criar Nova Nota
                </h2>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <textarea
                        placeholder="Conteúdo da nota"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={5}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            resize: "vertical",
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Grupo ID"
                        value={grupoId || ""}
                        onChange={(e) => setGrupoId(parseInt(e.target.value))}
                        required
                        style={{
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: "0.75rem",
                            backgroundColor: "hsl(223, 54%, 11%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        {isSubmitting ? "Salvando..." : "Salvar Nota"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateNoteForm;
