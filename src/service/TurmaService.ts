import {Turma} from "../types/Turma";
import {http} from "./Http";

export const turmaApi = {
    list: () => http.get("/turma"),
    get: (id: number) => http.get(`/turma/${id}`),
    create: (data: Turma) => http.post("/turma", data),
    update: (id: number, data: Turma) => http.put(`/turma/${id}`, data),
    remove: (id: number) => http.delete(`/turma/${id}`),
};
