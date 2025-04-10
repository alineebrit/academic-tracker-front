import {Atividade} from "./Atividade";
import {Note} from "./Note";
import {User} from "./User";

export interface Grupo {
    id: number;
    turmaId: number;
    name: string;
    atividades: Atividade[];
    notes: Note[];
    user: User[];
}
