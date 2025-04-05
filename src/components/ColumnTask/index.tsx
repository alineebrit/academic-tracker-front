import React, {useRef, useEffect} from "react";
import {useDrop} from "react-dnd";
import TaskCard from "../TaskCard";
import {statusTask, Task} from "../../types/Task";
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
        <div ref={ref} className={`kanban-column ${isOver && "hovered"} `}>
            <h2 className="kanban-column-title">{description}</h2>

            {tasks.length > 0
                ? tasks
                      .filter((task) => task.status.toString() === status)
                      .map((task) => <TaskCard key={task.id} task={task} />)
                : ""}
        </div>
    );
};

export default ColumnTask;
