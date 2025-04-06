import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ColumnTask from "../ColumnTask/index";
import {getStatusLabel, statusTask, Task} from "../../types/Task";
import "./style.css";
import {tasksApi} from "../../service/TasksService";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadTasks = async () => {
        try {
            setIsLoading(true);
            const res = await tasksApi.list();
            setTasks(res.data.data);
        } catch (err) {
            console.error("Erro ao buscar tasks:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const moveTask = async (taskId: string, newStatus: statusTask) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            )
        );

        try {
            await tasksApi.update(parseInt(taskId), {status: newStatus});
        } catch (error) {
            console.error("Não foi possível atualizar a raia", error);
        }
    };

    if (isLoading) {
        return (
            <div
                className="loading"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "15%",
                }}
            >
                <img src="../../../loading2.svg" alt="Carregando..." />
            </div>
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board">
                {Object.entries(statusTask).map(([key, value]) => (
                    <ColumnTask
                        key={key}
                        description={getStatusLabel(value)}
                        status={key}
                        tasks={tasks}
                        moveTask={moveTask}
                        onRefresh={loadTasks}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default TaskList;
