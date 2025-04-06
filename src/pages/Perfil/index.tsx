import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../../contexts/AuthContext";
import Header from "../../components/Header";
import Sheet from "../../components/Sheets";
import "./style.css";
import InputProfile from "../../components/Input";

const Profile = () => {
    const auth = useContext(AuthContext);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [grupoId, setGrupoId] = useState<number>();
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        if (auth?.user) {
            setName(auth.user.name);
            setEmail(auth.user.email);
            if (auth.user.grupoId) setGrupoId(auth.user.grupoId);
        }
    }, [auth?.user]);

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:3000/user/${auth?.user?.id}`,
                {
                    name,
                    email,
                    grupoId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Ocorreu um erro ao salvar.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <Header></Header>
            <Sheet></Sheet>
            <div
                style={{
                    paddingLeft: "4%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3rem",
                    flexDirection: "column",
                    border: "1px solid red",
                }}
            >
                <h2>Perfil do Usuário</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="input-box"
                >
                    <InputProfile
                        label="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                    />

                    <InputProfile
                        label="Email"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                    />

                    <InputProfile
                        label="Grupo"
                        value={grupoId?.toString() || ""}
                        onChange={(e) => setGrupoId(parseInt(e.target.value))}
                        type="text"
                        required
                    />

                    <button type="submit" disabled={isSaving}>
                        {isSaving ? "Salvando..." : "Salvar"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Profile;
