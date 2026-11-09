import './Task.css'



function Task({ name, description, id, completed, updateobjList, onClick, start }) {
    function resetTask() {
        updateobjList((tasks) => tasks.filter((task) => task.id !== id))
    }

    function toggleCompleted() {
        updateobjList((tasks) => tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    return (
        <div className="task-form">
            <div className="task-info">
                <button className="check-box" onClick={toggleCompleted}><svg className={completed ? '' : 'invisible'} width="42" height="29" viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 14.5L14.5098 29L42 1.52848L40.4705 0L14.5098 25.943L1.52951 12.9715L0 14.5Z" fill="#69BD85" />
                </svg>
                </button>
                <div className="inputs-container">
                    <div className="task-name" >
                        {name}
                    </div>
                    <p className="task-description">
                        {description}
                    </p>
                </div>
            </div>
            <div className="buttons-container">
                <button className={`reset-button${start ? ' invisible' : ''}`} onClick={resetTask}>
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 0H5.5C4.4 0 3.5 0.9 3.5 2V4.5H0V5.5H1.5V18C1.5 19.1 2.4 20 3.5 20H13.5C14.6 20 15.5 19.1 15.5 18V5.5H17V4.5H13.5V2C13.5 0.9 12.6 0 11.5 0ZM4.5 2C4.5 1.4485 4.9485 1 5.5 1H11.5C12.0515 1 12.5 1.4485 12.5 2V4.5H4.5V2ZM14.5 18C14.5 18.5515 14.0515 19 13.5 19H3.5C2.9485 19 2.5 18.5515 2.5 18V5.5H14.5V18Z" fill="white" />
                        <path d="M7 8.5H6V15.5H7V8.5Z" fill="white" />
                        <path d="M11 8.5H10V15.5H11V8.5Z" fill="white" />
                    </svg>
                </button>
                <button className={`conf-button${start ? 'invisible' : ''}`} onClick={onClick}>
                    {!start && <span>start</span>}
                </button>
            </div>
        </div>
    )
}

export default Task