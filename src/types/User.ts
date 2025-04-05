import {statusTask} from "./Task";
import {Turma} from "./Turma";

export interface User {
    id: number;
    name: string;
    email: string;
    grupoId: number | null;
    role: statusTask;
    turmas?: Turma[];
}
