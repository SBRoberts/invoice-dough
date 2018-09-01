import React, { Component } from 'react';
import firebase from 'firebase';

const Task = (props) => {
    console.log(props)
    // task will contain 3 key/value pairs - name, hours, sum
    return (
        <form onSubmit={this.addTask} className="task row row__justifyCenter" >
            <input id="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" />

            <input id="hours" onChange={this.handleChange} type="number" step="any" placeholder="Hours" />

            <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..."></textarea>

            <button type="submit">Add Task</button>
        </form>
    )
}

export default Task;