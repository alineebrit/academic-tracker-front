import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ColumnTask from "../ColumnTask/index";
import {statusTask, Task} from "../../types/Task";
import "./style.css";
import {tasksApi} from "../../service/TasksService";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        tasksApi
            .list()
            .then((res) => {
                setTasks(res.data.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar tasks:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const moveTask = (taskId: string, newStatus: string) => {
        setTasks((prev) => {
            prev.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            );
        });
    };

    if (isLoading) {
        return <div className="loading">Carregando tarefas...</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                {Object.entries(statusTask).map(([key, value]) => (
                    <>
                        <ColumnTask
                            key={key}
                            description={value}
                            status={key}
                            tasks={tasks}
                            moveTask={moveTask}
                        />
                    </>
                ))}
            </div>
        </DndProvider>
    );
};

export default TaskList;
