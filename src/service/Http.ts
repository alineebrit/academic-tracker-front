import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:3000/",
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

// app.use('/atividades', atividadeRoutes);
// app.use('/user', userRoutes);
// app.use('/turma', turmaRoutes);
// app.use('/notes', noteRoutes);
// app.use('/grupo', grupoRoutes);
// app.use('/auth', authRoutes);
