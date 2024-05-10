import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasksHandler = useCallback(() => {
    setLoading(true);
    axios
    .get("http://localhost:3000/tasks")
    .then((response) => {
      if (response.status === 200) {
        setTasks(response.data);
        errorText?.length > 0 && setErrorText("");
      }
    })
    .catch((err) => {
      if (err) {
        setErrorText(err.message);
        setTasks([]);
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    fetchTasksHandler();
  }, []);
 
  return (
    <div dir='rtl' className='todo-container'>
      <TodoForm fetchTasks={fetchTasksHandler} />
      <hr />
      <TodoList loading={loading} tasks={tasks} errorText={errorText} fetchTasks={fetchTasksHandler} />
    </div>
  )
}

export default App