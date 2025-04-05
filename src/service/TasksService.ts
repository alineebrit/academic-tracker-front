import {Task} from "../types/Task";
import {http} from "./Http";

export const tasksApi = {
    list: () => http.get("/atividades"),
    get: (id: string) => http.get(`/atividades/${id}`),
    create: (data: Task) => http.post("/atividades", data),
    update: (id: string, data: Partial<Task>) =>
        http.put(`/atividades/${id}`, data),
    remove: (id: string) => http.delete(`/atividades/${id}`),
};
