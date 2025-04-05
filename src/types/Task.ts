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

export const ColorStatus: {[key: string]: string} = {
    NAO_INICIADA: "#468189",
    EM_PROCESSO: "#42A5F5",
    AGUARDANDO_CORRECAO: "#F57C00",
    FINALIZADA: "#00C853",
};
