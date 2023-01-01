import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'

const storeTasks = (taskMap) => {
  localStorage.setItem(
    TASKS_STORAGE_KEY,
    JSON.stringify(taskMap)
  )
}

const readStoredTasks = () => {
  const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY))

  return tasksMap ? tasksMap : { tasks: [], completedTasks: [] }
}

const Tasks = () => {
  const [taskText, setTaskText] = useState('');
  const storedTasks = readStoredTasks();
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

  useEffect(() => {
    storeTasks({ tasks, completedTasks })
  })

  const updateTaskText = event => {
    setTaskText(event.target.value);
  }

  const addTask = () => {
    setTasks([...tasks, { taskText, id: uuid() } ])
  }

  const completeTask = completedTask => () => {
    // Using two arrow functions here will prevent an infinite loop by having completeTask return a function reference, itself. So, the return is actually a function with a completedTasks value.
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter(task => task.id !== completedTask.id))
  }

  const deleteTask = task => () => {
    setCompletedTasks(completedTasks.filter(t => t.id !== task.id))
  }

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input value={taskText} onChange={updateTaskText} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {
          tasks.map(task => {
            const {id, taskText } = task
            return (
              <div key={id} onClick={completeTask(task)}>
                {taskText}
              </div>
            )
          })
        }
      </div>
      <div className="completed-list">
        {
          completedTasks.map(task => {
            const { id, taskText } = task;
            return (
              <div key={id}>
                {taskText}{' '}
                <span className="delete-task" onClick={deleteTask(task)}>X</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )

}

export default Tasks