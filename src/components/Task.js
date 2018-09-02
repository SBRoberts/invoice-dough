import React from 'react';

const Task = (props) => {
    console.log(props)
    return (
        <form onSubmit={props.addTask} className="task row row__spaceBetween" >
            <input id="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" />

            <input id="hours" onChange={this.handleChange} type="number" step="any" placeholder="Hours" />

            <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..."></textarea>

            <button type="submit">Add Task</button>
        </form>
    )
}

export default Task;