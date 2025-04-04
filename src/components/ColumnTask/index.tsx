import React, {useRef, useEffect} from "react";
import {useDrop} from "react-dnd";
import TaskCard from "../TaskCard";
import {Task} from "../../types/Task";
import "./style.css";

type ColumnProps = {
    status: string;
    tasks: Task[];
    moveTask: (taskId: string, newStatus: string) => void;
};

const ColumnTask: React.FC<ColumnProps> = ({status, tasks, moveTask}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [{isOver}, drop] = useDrop({
        accept: "TASK",
        drop: (item: {id: string}) => moveTask(item.id, status),
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
        <div ref={ref} className={`kanban-column ${isOver ? "hovered" : ""}`}>
            <h2 className="kanban-column-title">{status}</h2>
            {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
        </div>
    );
};

export default ColumnTask;
