import React from 'react';
import './TodoList.css';

const TodoList = (props) => {
    const {loading,tasks,updateTask,removeTask,changeStatus,activeTask,errorText} = props;

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
              <button type='button' className='update-button' onClick={() => updateTask(task)}>
                {activeTask === task.id ? "لغو" : "ویرایش"}
              </button>
              <button type='button' className='delete-button' onClick={() => removeTask(task.id)}>حذف</button>
              <input
                type="checkbox"
                className="check-task-status"
                value={task.isDone ? true : false}
                checked={task.isDone ? true : false}
                onChange={() => changeStatus(task)}
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