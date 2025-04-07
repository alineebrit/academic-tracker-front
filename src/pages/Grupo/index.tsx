import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import {grupoApi} from "../../service/GrupoService";
import {turmaApi} from "../../service/TurmaService";
import {AuthContext} from "../../contexts/AuthContext";

type GrupoType = {
    id: number;
    name: string;
    turmaId: number;
};

type TurmaType = {
    id: number;
    name: string;
};

const GrupoPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const [grupos, setGrupos] = useState<GrupoType[]>([]);
    const [turmas, setTurmas] = useState<TurmaType[]>([]);
    const [name, setName] = useState<string>("");
    const [turmaId, setTurmaId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchGrupos = async () => {
        try {
            setLoading(true);
            const res = await grupoApi.list();
            setGrupos(res.data.data);
        } catch (err) {
            console.error("Erro ao buscar grupos", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTurmas = async () => {
        try {
            const res = await turmaApi.list();
            setTurmas(res.data.data);
        } catch (err) {
            console.error("Erro ao buscar turmas", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user?.id || !turmaId) return;

        setIsSubmitting(true);

        try {
            await grupoApi.create({name, turmaId});
            setName("");
            setTurmaId(null);
            fetchGrupos();
        } catch (err) {
            console.error("Erro ao criar grupo", err);
            alert("Erro ao criar grupo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteGrupo = async (id: number) => {
        const confirm = window.confirm(
            "Tem certeza que deseja excluir este grupo?"
        );
        if (!confirm) return;

        try {
            await grupoApi.remove(id);
            setGrupos((prev) => prev.filter((g) => g.id !== id));
        } catch (err) {
            console.error("Erro ao excluir grupo", err);
            alert("Erro ao excluir grupo.");
        }
    };

    useEffect(() => {
        fetchGrupos();
        fetchTurmas();
    }, []);

    return (
        <>
            <Header />
            <Sheet />
            <div style={{display: "flex", padding: "2rem", gap: "3rem"}}>
                {/* Lista de grupos */}
                <div style={{flex: 1, paddingLeft: "4%"}}>
                    <h2>Grupos Disponíveis</h2>
                    {loading ? (
                        <img
                            src="../../../public/loading.svg"
                            alt="Carregando..."
                        />
                    ) : (
                        <ul style={{paddingLeft: "1rem"}}>
                            {grupos.map((grupo) => (
                                <li
                                    key={grupo.id}
                                    style={{
                                        background: "#f3f3f3",
                                        marginBottom: "1rem",
                                        padding: "1rem",
                                        borderRadius: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <strong>Nome:</strong> {grupo.name}{" "}
                                        <br />
                                        <strong>Turma ID:</strong>{" "}
                                        {grupo.turmaId}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteGrupo(grupo.id)
                                        }
                                        style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#e74c3c",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Formulário de criação */}
                <div style={{flex: 1}}>
                    <h2>Criar Novo Grupo</h2>
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
                            placeholder="Nome do grupo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <select
                            value={turmaId ?? ""}
                            onChange={(e) => setTurmaId(Number(e.target.value))}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <option value="" disabled>
                                Selecione uma turma
                            </option>
                            {turmas.map((turma) => (
                                <option key={turma.id} value={turma.id}>
                                    {turma.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: "0.75rem",
                                backgroundColor: "hsl(223, 54%, 35%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            {isSubmitting ? "Salvando..." : "Criar Grupo"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default GrupoPage;
