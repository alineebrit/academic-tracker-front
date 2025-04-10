import {Grupo} from "../types/Grupo";
import {http} from "./Http";

export const grupoApi = {
    list: () => http.get("/grupo"),
    get: (id: number) => http.get(`/grupo/${id}`),
    create: (data: Partial<Grupo>) => http.post("/grupo", data),
    update: (id: number, data: Partial<Grupo>) =>
        http.put(`/grupo/${id}`, data),
    remove: (id: number) => http.delete(`/grupo/${id}`),
    getGroupsByTurmaId: (id: number) => http.get(`/grupo/${id}/grupos`),
};
