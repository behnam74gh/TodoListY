import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({children}) => {
    const [mode, setMode] = useState('create');
    const [activeTask, setActiveTask] = useState('');
    const [task, setTask] = useState({
        id: "",
        title: "",
        description: "",
        isDone: false
    });
    const [allTasks, setAllTasks] = useState({
        tasks: [],
        tasksLoading: false,
        tasksErrorText: ""
    });

    const setAllTasksHandler = (data) => {
        setAllTasks({...allTasks, ...data});
    };
    const setTaskHandler = (data) => {
        setTask({
            id: data.id,
            title: data.title,
            description: data.description,
            isDone: data.isDone
        })
    }
    const setModeHandler = (data) => setMode(data);
    const setActiveTaskHandler = (data) => setActiveTask(data);
    return (
        <TodoContext.Provider value={{task,setTaskHandler,mode,setModeHandler,activeTask,setActiveTaskHandler,allTasks,setAllTasksHandler}}>
            {children}
        </TodoContext.Provider>
    )
};