import axios from "axios";

export const getAllTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3000/tasks");
        return response;
    } catch (error) {
        return error.response;
    }
} 

export const createTask = async (task) => {
    try {
        const response = await axios.post("http://localhost:3000/tasks", {
            title: task.title,
            description: task.description,
            isDone: task.isDone
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const updateTask = async (task) => {
    try {
        const response = await axios.patch(`http://localhost:3000/tasks/${task.id}`, { title: task.title, description: task.description });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const changeTaskStatus = async (id, isDone) => {
    try {
        const response = await axios.patch(`http://localhost:3000/tasks/${id}`, { isDone: !isDone });
        return response;
    } catch (error) {
        return error.response;
    }
}