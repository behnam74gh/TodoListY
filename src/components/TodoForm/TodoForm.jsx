import React from 'react';
import './TodoForm.css';

const TodoForm = (props) => {
  const {submitHandler,task,setTask,loading,mode} = props;
  return (
    <div className="form-wrapper">
        <h5>لطفا عنوان و متن یادداشت را وارد نمایید</h5>
        <form className="todo-form" onSubmit={submitHandler}>
            <input type='text' placeholder='عنوان' value={task.title} className='w-50'
            onChange={(e) => setTask({...task, title: e.target.value})}
            />

            <textarea value={task.description} placeholder='توضیحات' rows="5" className='w-50'
            onChange={(e) => setTask({...task, description: e.target.value})}
            ></textarea>
            
            <button type="submit" className='w-25'>
            {loading ? "Loading ..." : mode === "create" ? "ثبت یادداشت" : "ویرایش یادداشت"}
            </button>
        </form>
    </div>
  )
}

export default TodoForm