import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Column from "../ColumnTask/index";
import {Task} from "../../types/Task";
import "./style.css";

const initialTasks: Task[] = [
    {id: "1", title: "Criar API de Login", status: "todo"},
    {id: "2", title: "Criar Design do Dashboard", status: "in-progress"},
    {id: "3", title: "Conectar Banco de Dados", status: "done"},
];

const statuses = ["todo", "in-progress", "done"];

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const moveTask = (taskId: string, newStatus: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            )
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                {statuses.map((status) => (
                    <Column
                        key={status}
                        status={status}
                        tasks={tasks}
                        moveTask={moveTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default TaskList;
