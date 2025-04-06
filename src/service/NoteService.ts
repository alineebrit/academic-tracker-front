import {Note} from "../types/Note";
import {http} from "./Http";

export const notesApi = {
    list: () => http.get("/notes").then((res) => res.data),
    get: (id: number) => http.get(`/notes/${id}`),
    create: (data: Partial<Note>) => http.post("/notes", data),
    update: (id: number, data: Partial<Note>) => http.put(`/notes/${id}`, data),
    remove: (id: number) => http.delete(`/notes/${id}`),
};
