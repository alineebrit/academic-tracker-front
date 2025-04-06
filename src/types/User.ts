import {Turma} from "./Turma";

export interface User {
    id: number;
    name: string;
    email: string;
    grupoId: number | null;
    role: Role;
    turmas?: Turma[];
}

export enum Role {
    ADMIN = "ADMIN",
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR",
}
