import React, {useRef, useEffect} from "react";
import {useDrag} from "react-dnd";
import {Task} from "../../types/Task";
import "./style.css";
type TaskCardProps = {
    task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const ref = useRef<HTMLDivElement | null>(null);

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
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            {task.title}
        </div>
    );
};

export default TaskCard;
