import { useState } from 'react'
import './Task.css'
function CreateTask({ taskState, updateobjList }) {
    const [error, setError] = useState(false)
    const submitTask = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if (String(formData.get('taskName')).split(' ').join('') !== '') {
            updateobjList((tasks) => [...tasks, {
                taskName: formData.get('taskName'),
                taskDescription: formData.get('taskDescription'),
                id: crypto.randomUUID(),
                completed: false
            }])
            taskState(false)
            setError(false)
        } else {
            setError(true)
        }
    }

    const resetTask = () => {
        taskState(false)
    }

    return (
        <form className="task-form" action="" onSubmit={submitTask} onReset={resetTask}>
            <div className="inputs-container">
                <input className="task-name__input" type="text" name="taskName" placeholder={error ? 'write a task' : ''} />
                <input className="task-description__input" type="text" name="taskDescription" />
            </div>
            <div className="buttons-container">
                <button className="reset-button" type="reset">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.06058 0.353539L18.0311 17.3241" stroke="white" />
                        <path d="M0.353478 17.3829L17.324 0.412365" stroke="white" />
                    </svg>
                </button>
                <button className="conf-button" type="submit">
                    <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8.29134L8.29134 16.5827L24 0.874008L23.126 0L8.29134 14.8347L0.874008 7.41733L0 8.29134Z" fill="white" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export { CreateTask }