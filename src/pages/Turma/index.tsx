import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import {turmaApi} from "../../service/TurmaService";
import {AuthContext} from "../../contexts/AuthContext";
import {FaPlus, FaMinus} from "react-icons/fa";
import {grupoApi} from "../../service/GrupoService";

type GrupoType = {
    id: number;
    name: string;
};

type TurmaType = {
    id: number;
    name: string;
    grupos?: GrupoType[];
};

const Turma: React.FC = () => {
    const auth = useContext(AuthContext);
    const [turmas, setTurmas] = useState<TurmaType[]>([]);
    const [expandedTurmaId, setExpandedTurmaId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTurmas = async () => {
        try {
            setLoading(true);
            const res = await turmaApi.list();
            setTurmas(res.data.data);
        } catch (err) {
            console.error("Erro ao buscar turmas", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchGruposByTurma = async (turmaId: number) => {
        try {
            const res = await grupoApi.getGroupsByTurmaId(turmaId);
            setTurmas((prev) =>
                prev.map((turma) =>
                    turma.id === turmaId
                        ? {...turma, grupos: res.data.data}
                        : turma
                )
            );
        } catch (err) {
            console.error("Erro ao buscar grupos", err);
        }
    };

    const toggleExpand = (turmaId: number) => {
        if (expandedTurmaId === turmaId) {
            setExpandedTurmaId(null);
        } else {
            setExpandedTurmaId(turmaId);
            fetchGruposByTurma(turmaId);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user?.id) return;

        setIsSubmitting(true);

        try {
            await turmaApi.create({name, userId: auth.user.id});
            setName("");
            fetchTurmas();
        } catch (err) {
            console.error("Erro ao criar turma", err);
            alert("Erro ao criar turma.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchTurmas();
    }, []);

    return (
        <>
            <Header />
            <Sheet />
            <div style={{display: "flex", padding: "2rem", gap: "3rem"}}>
                <div style={{flex: 1, paddingLeft: "4%"}}>
                    <h2>Turmas Disponíveis</h2>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        <ul style={{paddingLeft: "1rem"}}>
                            {turmas.map((turma) => (
                                <li
                                    key={turma.id}
                                    style={{marginBottom: "1rem"}}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            backgroundColor: "#f3f3f3",
                                            padding: "1rem",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <span style={{fontWeight: "bold"}}>
                                            {turma.name}
                                        </span>
                                        <button
                                            onClick={() =>
                                                toggleExpand(turma.id)
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {expandedTurmaId === turma.id ? (
                                                <FaMinus size={18} />
                                            ) : (
                                                <FaPlus size={18} />
                                            )}
                                        </button>
                                    </div>

                                    {expandedTurmaId === turma.id && (
                                        <ul
                                            style={{
                                                marginTop: "0.5rem",
                                                marginLeft: "1.5rem",
                                            }}
                                        >
                                            {turma.grupos?.length ? (
                                                turma.grupos.map((grupo) => (
                                                    <li key={grupo.id}>
                                                        {grupo.name}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>
                                                    Nenhum grupo cadastrado.
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{flex: 1}}>
                    <h2>Criar Nova Turma</h2>
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
                            placeholder="Nome da turma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                                backgroundColor: "#1e90ff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            {isSubmitting ? "Salvando..." : "Criar Turma"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Turma;
