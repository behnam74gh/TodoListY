import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [tasks, setTasks] = useState([]);
    

    useEffect(() => {
        axios
          .get("http://localhost:3000/tasks")
          .then((response) => {
            console.log('=>',response);
            if (response.status === 200) {
              setTasks(response.data);
              errorText?.length > 0 && setErrorText("");
            }
          })
          .catch((err) => {
            if (err.response) {
              setErrorText(err.response.data.message);
              setTasks([]);
            }
          })
          .finally(() => {
            setLoading(false);
          });
    }, []);

  return (
    <div className='todo-container'>
        <div className="todo-wrapper">
          <h5>وظیفه های مقرر شده</h5>
            {loading ? (
            <div className="w-100">
                <span>Loading...</span>
            </div>
            ) : (
            tasks.length > 0 &&
            tasks.map((task) => (
              <div className="task-wrapper" key={task.id}>
                <strong className='title'>{task.title}</strong>
                <p className='description'>{task.description}</p>
                <div className="tasks-options-wrapper">
                  <button type='button' className='delete-button'>حذف</button>
                  <input
                    type="checkbox"
                    className="check-task-status"
                    value={task.isDone.toLowerCase() === "true" ? true : false}
                    checked={task.isDone.toLowerCase() === "true" ? true : false}
                  />
                </div>
              </div>
            ))
            )}
        </div>
    </div>
  )
}

export default App