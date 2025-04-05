import React, {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {User} from "../../types/User";

const ProfilePage: React.FC = () => {
    const auth = useContext(AuthContext);

    if (!auth || !auth.user) {
        return <div>Carregando...</div>;
    }

    const {email, name}: Partial<User> = auth.user;

    console.log("email", email);
    console.log("name", name);

    return (
        <div className="profile-page">
            <h2>Perfil do Usuário</h2>
            <p>
                <strong>ID:</strong>
            </p>
            <p>
                <strong>Nome:</strong>
            </p>
            <p>
                <strong>Email:</strong>
            </p>
        </div>
    );
};

export default ProfilePage;
