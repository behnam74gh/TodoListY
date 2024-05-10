import React,{ useContext, useState } from 'react';
import { TodoContext } from '../../Provider/Provider';
import axios from 'axios';
import './TodoList.css';

const TodoList = (props) => {
  const {loading,tasks,fetchTasks} = props;
  const {activeTask,setActiveTaskHandler,setModeHandler,setTaskHandler} = useContext(TodoContext);
  const [errorText, setErrorText] = useState("");

  const removeTaskHandler = (id) => {
    if (window.confirm("برای حذف این یادداشت مطئن هستید؟")) {
      axios
        .delete(`http://localhost:3000/tasks/${id}`)
        .then((response) => {
          if (response.status === 200) {
            window.alert("یادداشت حذف شد");
          }
        })
        .catch((err) => {
          if (err) {
            setErrorText(err.message);
          }
        })
        .finally(() => {
          fetchTasks();
        });
    }
  };
  const changeStatusHandler = (task) => {
    const {isDone, id} = task;

    axios
    .patch(`http://localhost:3000/tasks/${id}`, { isDone: !isDone })
    .then((response) => {
      if (response.status === 200) {
        window.alert("وضعیت یادداشت تغییر کرد");
      }
    })
    .catch((err) => {
      if (err) {
        setErrorText(err.message);
      }
    }).finally(() => {
      fetchTasks();
    });
  };

  const updateTaskHandler = (task) => {
    if(activeTask?.length > 0 && activeTask === task.id){
      setActiveTaskHandler("");
      setTaskHandler({
        id: "",
        title: "",
        description: "",
        isDone: false
      });
      setModeHandler('create');
    }else{
      setModeHandler('update');
      setActiveTaskHandler(task.id);
      setTaskHandler({
        id: task.id,
        title: task.title,
        description: task.description,
        isDone: task.isDone
      });
    }
  }

  return (
    <div className="todo-wrapper">
        <h5>یادداشت های ثبت شده</h5>
        {loading ? (
        <div className="w-100">
            <span>Loading...</span>
        </div>
        ) : (
        tasks.length > 0 &&
        tasks.map((task) => (
          <div className="task-wrapper" style={{background: activeTask === task.id && "#E1AFD1"}} key={task.id}>
            <strong className='title'>{task.title}</strong>
            <p className='description'>{task.description}</p>
            <div className="tasks-options-wrapper">
              <button type='button' className='update-button' onClick={() => updateTaskHandler(task)}>
                {activeTask === task.id ? "لغو" : "ویرایش"}
              </button>
              <button type='button' className='delete-button' onClick={() => removeTaskHandler(task.id)}>حذف</button>
              <input
                type="checkbox"
                className="check-task-status"
                value={task.isDone ? true : false}
                checked={task.isDone ? true : false}
                onChange={() => changeStatusHandler(task)}
              />
            </div>
          </div>
        ))
        )}
        {errorText.length > 0 && <p className='warning-message'>{errorText}</p>}
      </div>
  )
}

export default TodoList