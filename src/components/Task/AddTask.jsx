import './Task.css'

function AddTask({ onClick }) {
    return (
        <div className="add-task__container">
            <button className="add-task__button" type="button" onClick={onClick}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 4.37114e-08L13 24" strokeWidth="2" stroke="black" />
                    <path d="M1 12L25 12" strokeWidth="2" stroke="black" />
                </svg>
            </button>
        </div>
    )
}

export default AddTask