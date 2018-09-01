import React, {Component} from 'react';
import firebase from '../firebase';

// components
import Task from './Task'

class CreateInvoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            user: props.uid,
            hourlyRate: 50,
            dateCreated: this.props.getDate(),
            tasks: [],
        }
    }
    componentDidMount(){
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref(`users/${this.state.user}/`)

        // if user confirms submit...
        // Make sure the submit button is the last element - use it's innerHTML to define confirm text
        const confirmChoice = window.confirm(`Would you like to ${e.target.lastChild.innerHTML}?`);
        if(confirmChoice){
            // to get the current invoice, get a firebase to give us all the invoice keys when a value is updated
            dbRef.on('value', (snapshot) => {
                if(snapshot.val()){
                    const currentInvoice = Object.keys(snapshot.val());
                    
                    // the current invoice will always be the last object | currentInvoice.length - 1
                    // set invoice created to true
                    this.setState({
                        invoiceCreated: true,
                        invoiceKey: currentInvoice[currentInvoice.length - 1],
                        dateCreated: this.props.getDate(),
                    })
                }
            })
            dbRef.push(this.state)
        }  
    }

    handleChange = (e) => {
        
        // console.log(e.target)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    addTask = (e) => {
        e.preventDefault();

        // targeting the specific invoice now
        // console.log(this.state.invoiceKey)
        const dbRef = firebase.database().ref(`users/${this.state.user}/${this.state.invoiceKey}/tasks`)

        const confirmChoice = window.confirm(`Would you like to ${e.target.lastChild.innerHTML}?`);

        // if choice is confirmed, do the following else null
        if(confirmChoice){
            let tasksArr = Array.from(this.state.tasks || []);
            const task = {
                taskName : e.target[0].value,
                hours: e.target[1].value,
                description: e.target[2].value,
                sum: `${e.target[1].value * this.state.hourlyRate}`,
            }
            
            tasksArr.push(task)
    
            this.setState({
                tasks: tasksArr,
            })
            dbRef.update(tasksArr)

        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="row row__justifyCenter">
                    <input onChange={this.handleChange} id="client" className="client" type="text" placeholder="Client Name" />

                    <input onChange={this.handleChange} id="dateCreated" className="dateCreated" type="text" defaultValue={this.state.dateCreated} />

                    <input onChange={this.handleChange} id="hourlyRate" className="hourlyRate" type="text" defaultValue={this.state.hourlyRate} />

                    <button type="submit">Add Invoice</button>
                </form >
                {
                this.state.invoiceCreated
                ?
                // <form onSubmit={this.addTask} className="task row row__justifyCenter" >
                //     <input id="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" />

                //     <input id="hours" onChange={this.handleChange} type="number" step="any" placeholder="Hours" />

                //     <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..."></textarea>

                //     <button type="submit">Add Task</button>
                // </form>
                <Task />
                :
                null
                }
            </div>
        )
    }
}

export default CreateInvoice;