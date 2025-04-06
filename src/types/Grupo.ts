import {Atividade} from "./Atividade";
import {Note} from "./Note";
import {User} from "./User";

export interface Grupo {
    id: number;
    turmaId: number;
    atividades: Atividade[];
    notes: Note[];
    user: User[];
}
