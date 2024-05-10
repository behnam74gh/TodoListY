import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: ""
  });
  // const [tasksUpdated, setTasksUpdated] = useState(false);

  useEffect(() => {
    console.log('useEffect rendered');
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

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("http://localhost:3000/tasks", {
        title: task.title,
        description: task.description,
        isDone: false
      })
      .then((response) => {
        if (response.status === 201) {
          setTask({
            title: "",
            description: ""
          });
          // setTasksUpdated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const removeTaskHandler = (id) => {
    if (window.confirm("برای حذف این یادداشت مطئن هستید؟")) {
      axios
        .delete(`http://localhost:3000/tasks/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // setTasksUpdated(true);
          }
        })
        .catch((err) => {
          if (err) {
            console.log('r -> ', err);
            window.alert(err.response.statusText)
          }
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
        console.log('c -> ',err);
        if (err.response) {
          window.alert(err.response.statusText)
        }
      });
    };


  return (
    <div className='todo-container' dir='rtl'>
      <div className="form-wrapper">
        <h5>لطفا عنوان و متن یادداشت را وارد نمایید</h5>
        <form className="todo-form" onSubmit={submitHandler}>
          <input type='text' placeholder='عنوان' value={task.title}
            onChange={(e) => setTask({...task, title: e.target.value})}
          />

          <textarea value={task.description} placeholder='توضیحات' rows="5"
            onChange={(e) => setTask({...task, description: e.target.value})}
          ></textarea>
          
          <button type="submit">
          {!loading ? "ثبت" : "Loading ..."}
          </button>
        </form>
      </div>

      <hr />

      <div className="todo-wrapper">
        <h5>یادداشت های ثبت شده</h5>
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
                <button type='button' className='update-button' onClick={() => removeTaskHandler(task.id)}>ویرایش</button>
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
      </div>
    </div>
  )
}

export default App