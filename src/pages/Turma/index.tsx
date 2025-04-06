import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import {turmaApi} from "../../service/TurmaService";
import {AuthContext} from "../../contexts/AuthContext";

type TurmaType = {
    id: number;
    name: string;
};

const Turma: React.FC = () => {
    const auth = useContext(AuthContext);
    const [turmas, setTurmas] = useState<TurmaType[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
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
                                <li key={turma.id} style={{margin: "0.5rem 0"}}>
                                    {turma.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Formulário de cadastro */}
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
