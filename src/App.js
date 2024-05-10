import React, {useCallback, useEffect, useContext} from 'react'
import { TodoContext } from './Provider/Provider';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import { getAllTasks } from './Api/Api-functions';
import './App.css';

const App = () => {
  const { setAllTasksHandler } = useContext(TodoContext);

  const fetchTasksHandler = useCallback(() => {
    setAllTasksHandler({tasksLoading: true});

    getAllTasks()
    .then((response) => {
      if (response.status === 200) {
        setAllTasksHandler({tasksLoading: false,tasks: response.data,tasksErrorText: ""});
      }else{
        setAllTasksHandler({tasksLoading: false,tasksErrorText: response.statusText});
      }
    });
  }, []);

  useEffect(() => {
    fetchTasksHandler();
  }, []);
 
  return (
    <div dir='rtl' className='todo-container'>
      <TodoForm fetchTasks={fetchTasksHandler} />
      <hr />
      <TodoList fetchTasks={fetchTasksHandler} />
    </div>
  )
}

export default App