import React, {useRef, useEffect} from "react";
import {useDrop} from "react-dnd";
import TaskCard from "../TaskCard";
import {ColorStatus, statusTask, Task} from "../../types/Task";
import "./style.css";

type ColumnProps = {
    status: string;
    tasks: Task[];
    description: string;
    moveTask: (taskId: string, newStatus: statusTask) => Promise<void>;
};

const ColumnTask: React.FC<ColumnProps> = ({
    status,
    tasks,
    description,
    moveTask,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

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
            <div ref={ref} className={`kanban-column ${isOver && "hovered"} `}>
                <div>
                    {tasks.length > 0
                        ? tasks
                              .filter(
                                  (task) => task.status.toString() === status
                              )
                              .map((task) => (
                                  <div
                                      style={{
                                          padding: "0.5rem",
                                      }}
                                  >
                                      <TaskCard key={task.id} task={task} />
                                  </div>
                              ))
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default ColumnTask;
