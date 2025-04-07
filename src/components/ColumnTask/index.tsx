import React, {useRef, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import TaskCard from "../TaskCard";
import {ColorStatus, statusTask, Task} from "../../types/Task";
import "./style.css";
import {tasksApi} from "../../service/TasksService";

type ColumnProps = {
    status: string;
    tasks: Task[];
    description: string;
    moveTask: (taskId: string, newStatus: statusTask) => Promise<void>;
    onRefresh?: () => void; // opcional, caso queira controlar do pai
};

const ColumnTask: React.FC<ColumnProps> = ({
    status,
    tasks,
    description,
    moveTask,
    onRefresh,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [, setReloadTrigger] = useState(0); // para forçar rerender se necessário

    const [{isOver}, drop] = useDrop({
        accept: "TASK",
        drop: (item: {id: string}) => moveTask(item.id, status as statusTask),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    useEffect(() => {
        if (ref.current) {
            drop(ref.current);
        }
    }, [drop]);

    const handleDelete = async (id: number) => {
        try {
            await tasksApi.remove(id);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onRefresh ? onRefresh() : setReloadTrigger((prev) => prev + 1);
        } catch (err) {
            console.error("Erro ao deletar tarefa", err);
        }
    };

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <div className="kanban-title">
                <h2 className="kanban-column-title">{description}</h2>
                <div
                    style={{
                        border: `4px solid ${ColorStatus[status]}`,
                        margin: "8px",
                        padding: "8px",
                        borderRadius: "50px",
                    }}
                ></div>
            </div>
            <div ref={ref} className={`kanban-column ${isOver && "hovered"}`}>
                <div>
                    {tasks.length > 0
                        ? tasks
                              .filter(
                                  (task) => task.status.toString() === status
                              )
                              .map((task) => (
                                  <div
                                      key={task.id}
                                      style={{
                                          padding: "0.5rem",
                                      }}
                                  >
                                      <TaskCard
                                          task={task}
                                          onDelete={() =>
                                              handleDelete(parseInt(task.id))
                                          }
                                      />
                                  </div>
                              ))
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default ColumnTask;
