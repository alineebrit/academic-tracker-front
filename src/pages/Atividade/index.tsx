import {useState, useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import {ptBR} from "date-fns/locale";
import Header from "../../components/Header";

interface Atividade {
    id?: number;
    title: string;
    description: string | null;
    dueDate: Date | null;
    grupoId: number | null;
}

export default function Atividades() {
    const [atividades, setAtividades] = useState<Atividade[]>([]);
    const [novaAtividade, setNovaAtividade] = useState<Atividade>({
        title: "",
        description: "",
        dueDate: null,
        grupoId: null,
    });
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setNovaAtividade((prev) => ({
            ...prev,
            [name]: name === "grupoId" ? Number(value) : value,
        }));

        if (name === "description" && textareaRef.current) {
            textareaRef.current.style.height = "40px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleDateChange = (date: Date | null) => {
        setNovaAtividade((prev) => ({
            ...prev,
            dueDate: date,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !novaAtividade.title ||
            !novaAtividade.dueDate ||
            !novaAtividade.grupoId
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if (editandoId !== null) {
            setAtividades((prev) =>
                prev.map((a) =>
                    a.id === editandoId ? {...novaAtividade, id: editandoId} : a
                )
            );
            setEditandoId(null);
        } else {
            const nova = {
                ...novaAtividade,
                id: Date.now(),
            };
            setAtividades((prev) => [...prev, nova]);
        }

        setNovaAtividade({
            title: "",
            description: "",
            dueDate: null,
            grupoId: null,
        });

        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
        }
    };

    const handleEditar = (atividade: Atividade) => {
        setNovaAtividade(atividade);
        setEditandoId(atividade.id ?? null);

        if (textareaRef.current) {
            setTimeout(() => {
                textareaRef.current!.style.height = "40px";
                textareaRef.current!.style.height = `${
                    textareaRef.current!.scrollHeight
                }px`;
            }, 0);
        }
    };

    const handleExcluir = (id?: number) => {
        if (!id) return;
        if (confirm("Deseja excluir esta atividade?")) {
            setAtividades((prev) => prev.filter((a) => a.id !== id));
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="login-box">
                    <h2 style={{marginBottom: "1rem"}}>
                        {editandoId ? "Editar Atividade" : "Criar Atividade"}
                    </h2>

                    <form onSubmit={handleSubmit} className="atividades-form">
                        <div className="input-group">
                            <label>Título *</label>
                            <input
                                type="text"
                                name="title"
                                value={novaAtividade.title}
                                onChange={handleChange}
                                placeholder="Escreva o título"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Descrição</label>
                            <textarea
                                name="description"
                                value={novaAtividade.description || ""}
                                onChange={handleChange}
                                ref={textareaRef}
                                rows={3}
                                placeholder="Escreva algo..."
                            />
                        </div>

                        <div className="input-group">
                            <label>Data de entrega *</label>
                            <DatePicker
                                selected={novaAtividade.dueDate}
                                onChange={handleDateChange}
                                placeholderText="Selecione a data de entrega"
                                dateFormat="dd/MM/yyyy"
                                locale={ptBR}
                                className="input-date"
                                required
                                minDate={new Date()}
                            />
                        </div>

                        <div className="input-group">
                            <label>ID do Grupo *</label>
                            <input
                                type="number"
                                name="grupoId"
                                value={novaAtividade.grupoId ?? ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="salvar-atividade">
                            {editandoId ? "Atualizar" : "Salvar Atividade"}
                        </button>
                    </form>
                </div>

                {atividades.length > 0 && (
                    <div style={{marginTop: "2rem", textAlign: "left"}}>
                        <h3>📋 Atividades Criadas:</h3>
                        <ul>
                            {atividades.map((a) => (
                                <li
                                    key={a.id}
                                    style={{
                                        marginBottom: "1rem",
                                        padding: "0.75rem",
                                        backgroundColor: "#f9fafb",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <strong>{a.title}</strong>
                                    <br />
                                    {a.description || "Sem descrição"}
                                    <br />
                                    📅 Entrega:{" "}
                                    {a.dueDate
                                        ? new Date(
                                              a.dueDate
                                          ).toLocaleDateString()
                                        : "-"}{" "}
                                    | Grupo: {a.grupoId}
                                    <div
                                        style={{
                                            marginTop: "0.5rem",
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <button onClick={() => handleEditar(a)}>
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() => handleExcluir(a.id)}
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
