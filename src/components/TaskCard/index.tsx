import React, {useRef, useEffect} from "react";
import {useDrag} from "react-dnd";
import {ColorStatus, Task} from "../../types/Task";
import "./style.css";

type TaskCardProps = {
    task: Task;
    onDelete: (taskId: number) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({task, onDelete}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const status = task.status;

    const [{isDragging}, drag] = useDrag({
        type: "TASK",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        if (ref.current) {
            drag(ref.current);
        }
    }, [drag]);

    return (
        <div
            ref={ref}
            className="kanban-task"
            style={{
                opacity: isDragging ? 0.5 : 1,
                border: `2px solid ${ColorStatus[status]}`,
                position: "relative",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
            }}
        >
            <button
                onClick={() => onDelete(parseInt(task.id))}
                className="delete-button"
                title="Deletar tarefa"
            >
                <span className="material-symbols-outlined">delete</span>
            </button>

            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskCard;
