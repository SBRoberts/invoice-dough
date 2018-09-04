import React from 'react';

const Task = (props) => {
    return (
        <form onSubmit={props.addTask} className="task row row__spaceBetween" >
            <div className="inputContainer">
                <input id="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" />
            </div>
            <div className="inputContainer">
                <input id="hours" onChange={this.handleChange} type="number" step="any" placeholder="Hours" />
            </div>
            
            <div className="inputContainer">
                <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..."></textarea>
            </div>

            <button type="submit">Add Task</button>
        </form>
    )
}

export default Task;