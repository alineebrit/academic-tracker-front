import {Task} from "../types/Task";
import {http} from "./Http";

export const tasksApi = {
    list: () => http.get("/atividades"),
    get: (id: number) => http.get(`/atividades/${id}`),
    create: (data: Task) => http.post("/atividades", data),
    update: (id: number, data: Partial<Task>) =>
        http.put(`/atividades/${id}`, data),
    remove: (id: number) => http.delete(`/atividades/${id}`),
};
