export type Task = {
    id: string;
    description: string;
    title: string;
    grupoId: number | null | undefined;
    dueDate: string | null | undefined;
    status: statusTask;
};

export enum statusTask {
    NAO_INICIADA = "NAO_INICIADA",
    EM_PROCESSO = "EM_PROCESSO",
    AGUARDANDO_CORRECAO = "AGUARDANDO_CORRECAO",
    FINALIZADA = "FINALIZADA",
}

export const ColorStatus: {[key: string]: string} = {
    NAO_INICIADA: "#468189",
    EM_PROCESSO: "#42A5F5",
    AGUARDANDO_CORRECAO: "#F57C00",
    FINALIZADA: "#00C853",
};

export const getStatusLabel = (status: statusTask): string => {
    const labels: Record<statusTask, string> = {
        [statusTask.NAO_INICIADA]: "Não Iniciada",
        [statusTask.EM_PROCESSO]: "Em Processo",
        [statusTask.AGUARDANDO_CORRECAO]: "Aguardando Correção",
        [statusTask.FINALIZADA]: "Finalizada",
    };
    return labels[status];
};
