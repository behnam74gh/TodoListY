import React, { useContext, useState } from 'react';
import { TodoContext } from '../../Provider/Provider';
import { createTask, updateTask } from '../../Api/Api-functions';
import './TodoForm.css';

const TodoForm = (props) => {
  const {fetchTasks} = props;
  const {task,mode,setTaskHandler,setModeHandler,setActiveTaskHandler} = useContext(TodoContext);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    if(mode === "create"){
        createTask(task)
        .then((response) => {
            setLoading(false);
            if (response.status === 201) {
            setTaskHandler({
                id: "",
                title: "",
                description: "",
                isDone: false
            });
            fetchTasks();
            setErrorText("");
            }else{
                setErrorText(response.statusText);
            }
        })
    }else{
        updateTask(task)
        .then((response) => {
            setLoading(false);
            if (response.status === 200) {
                setTaskHandler({
                id: "",
                title: "",
                description: "",
                isDone: false
                });
                setActiveTaskHandler("");
                setModeHandler('create');
                fetchTasks();
            }else{
                setErrorText(response.statusText);
            }
        });
    }
  };

  return (
    <div className="form-wrapper">
        <h5>لطفا عنوان و متن یادداشت را وارد نمایید</h5>
        <form className="todo-form" onSubmit={submitHandler}>
            <input type='text' placeholder='عنوان' value={task.title} className='w-50'
            onChange={(e) => setTaskHandler({...task, title: e.target.value})}
            />

            <textarea value={task.description} placeholder='توضیحات' rows="5" className='w-50'
            onChange={(e) => setTaskHandler({...task, description: e.target.value})}
            ></textarea>
            
            <button type="submit" className='w-25' disabled={!task.title.length || !task.description.length}>
            {loading ? "Loading ..." : mode === "create" ? "ثبت یادداشت" : "ویرایش یادداشت"}
            </button>
        </form>
        {errorText.length > 0 && <p className='warning-message'>{errorText}</p>}
    </div>
  )
}

export default React.memo(TodoForm)