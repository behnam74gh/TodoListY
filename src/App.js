import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';

const App = () => {
  const [mode, setMode] = useState('create');
  const [activeTask, setActiveTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    isDone: false
  });

  const fetchTasksHandler = () => {
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
  }

  useEffect(() => {
    fetchTasksHandler();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    if(mode === "create"){
      axios
      .post("http://localhost:3000/tasks", {
        title: task.title,
        description: task.description,
        isDone: task.isDone
      })
      .then((response) => {
        if (response.status === 201) {
          setTask({
            title: "",
            description: ""
          });
        }
      })
      .catch((err) => {
        setErrorText(err.message);
      })
      .finally(() => {
        setLoading(false);
        fetchTasksHandler();
      });
    }else{
      axios
      .patch(`http://localhost:3000/tasks/${task.id}`, { title: task.title, description: task.description })
      .then((response) => {
        if (response.status === 200) {
          setTask({
            title: "",
            description: ""
          });
        }
      })
      .catch((err) => {
        setErrorText(err.message);
      })
      .finally(() => {
        setLoading(false);
        setActiveTask("");
        setTask({
          id: "",
          title: "",
          description: "",
          isDone: false
        });
        setMode('create');
        fetchTasksHandler();
      });;
    }
  };
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
          fetchTasksHandler();
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
      fetchTasksHandler();
    });
  };

  const updateTaskHandler = (task) => {
    if(activeTask?.length > 0 && activeTask === task.id){
      setActiveTask("");
      setTask({
        id: "",
        title: "",
        description: "",
        isDone: false
      });
      setMode('create');
    }else{
      setMode('update');
      setActiveTask(task.id);
      setTask({
        id: task.id,
        title: task.title,
        description: task.description,
        isDone: task.isDone
      });
    }
  }

  return (
    <div className='todo-container' dir='rtl'>
      <div className="form-wrapper">
        <h5>لطفا عنوان و متن یادداشت را وارد نمایید</h5>
        <form className="todo-form" onSubmit={submitHandler}>
          <input type='text' placeholder='عنوان' value={task.title} className='w-100'
            onChange={(e) => setTask({...task, title: e.target.value})}
          />

          <textarea value={task.description} placeholder='توضیحات' rows="5" className='w-100'
            onChange={(e) => setTask({...task, description: e.target.value})}
          ></textarea>
          
          <button type="submit" className='w-50'>
          {loading ? "Loading ..." : mode === "create" ? "ثبت یادداشت" : "ویرایش یادداشت"}
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
    </div>
  )
}

export default App