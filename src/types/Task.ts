export type Task = {
    id: string;
    description: string;
    title: string;
    grupoId: string | null;
    dueDate: Date | null;
    status: statusTask;
};

export enum statusTask {
    NAO_INICIADA = "NÃO INICIADA",
    EM_PROCESSO = "EM PROCESSO",
    AGUARDANDO_CORRECAO = "AGUARDANDO CORREÇÃO",
    FINALIZADA = "FINALIZADA",
}
