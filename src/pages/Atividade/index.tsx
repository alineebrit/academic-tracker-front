import React, {useState, useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import {tasksApi} from "../../service/TasksService";
import {getStatusLabel, statusTask} from "../../types/Task";
import {Role} from "../../types/User";

const CreateActivityForm = () => {
    const auth = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<string>("");
    const [grupoId, setGrupoId] = useState<number | undefined | null>(
        auth?.user?.grupoId
    );

    const [status, setStatus] = useState<statusTask>(statusTask.NAO_INICIADA);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await tasksApi.create({
                title,
                description,
                dueDate,
                grupoId: Number(grupoId),
                status,
            });

            alert("Atividade criada com sucesso!");
            setTitle("");
            setDescription("");
            setDueDate("");
            setStatus(statusTask.NAO_INICIADA);
        } catch (err) {
            console.error("Erro ao criar atividade", err);
            alert("Erro ao criar a atividade.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <Sheet />
            <div
                style={{
                    display: "flex",
                    padding: "2rem",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{flex: 1, maxWidth: "400px"}}>
                    <h2 style={{marginBottom: "1rem", fontSize: "1.5rem"}}>
                        Criar Nova Atividade
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
                        <input
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Grupo ID"
                            value={grupoId || ""}
                            onChange={(e) => setGrupoId(Number(e.target.value))}
                            required
                            disabled={auth?.user?.role == Role.ALUNO}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as statusTask)
                            }
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        >
                            {Object.values(statusTask).map((s) => (
                                <option key={s} value={s}>
                                    {getStatusLabel(s)}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: "hsl(223, 54%, 11%)",
                                color: "#fff",
                                padding: "0.75rem",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            {isSubmitting ? "Salvando..." : "Salvar Atividade"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateActivityForm;
