import {Turma} from "../types/Turma";
import {http} from "./Http";

export const turmaApi = {
    list: () => http.get("/turma"),
    get: (id: string) => http.get(`/turma/${id}`),
    create: (data: Turma) => http.post("/turma", data),
    update: (id: string, data: Turma) => http.put(`/turma/${id}`, data),
    remove: (id: string) => http.delete(`/turma/${id}`),
};
