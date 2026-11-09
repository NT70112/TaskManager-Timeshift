import { useEffect, useState } from 'react'
import './reset.css'
import './App.css'
import { CreateTask, } from './components/Task/CreateTask'
import Header from './components/Header/Header'
import AddTask from './components/Task/AddTask'
import Task from './components/Task/Task'
import Timer from './components/Timer/Timer'

const TASKS_STORAGE_KEY = 'task'

function App() {
  const [isCreateTask, setIsCreateTask] = useState(false)
  const [tasksObj, setTasksObj] = useState(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    if (!savedTasks) return []
    try {
      const parsedTasks = JSON.parse(savedTasks)
      return (Array.isArray(parsedTasks) ? parsedTasks : [])
    } catch {
      return []
    }
  })
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksObj))
  }, [tasksObj])
  const [startTimer, setStartTimer] = useState(false)
  const [timerReset, settimerReset] = useState(0)
  const [showTasks, setShowTasks] = useState(false)


  return (
    <div className="app">
      <div className="container">
        <Header showTasks={showTasks} setShowTasks={setShowTasks} />
        <div className="content__conteiner">
          <div className={`task__container${showTasks ? ' task__container--visible' : ''}`}>
            <AddTask onClick={() => setIsCreateTask(true)} />
            {isCreateTask && <CreateTask taskState={setIsCreateTask} updateobjList={setTasksObj} />}
            {tasksObj.length > 0 && tasksObj.map((i) => <Task onClick={() => settimerReset((token) => token + 1)} id={i.id} name={i.taskName} description={i.taskDescription} completed={i.completed} key={i.id} updateobjList={setTasksObj} start={startTimer} />)}
          </div>
          <div className="timer__container">
            <Timer resetToken={timerReset} start={startTimer} updateStartTimer={setStartTimer} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
