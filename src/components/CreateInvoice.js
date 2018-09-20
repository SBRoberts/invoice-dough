// The CreateInvoice component is where invoices are created and tasks are added 

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
            tasks: [],
        }
    }
    componentDidMount(){
        if(this.props.openInvoice){
            this.setState({
                dateCreated: this.props.openInvoice.dateCreated,
                invoiceKey: this.props.openInvoice.key,
                invoiceCreated: true,
                tasks: this.props.openInvoice.tasks,
            })
        } else{
            this.setState({
                dateCreated: this.props.getDate(),
            })
        }
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
                    if(!this.props.openInvoice){
                        const currentInvoice = Object.keys(snapshot.val());
                        // the current invoice will always be the last object | currentInvoice.length - 1
                        this.setState({
                            invoiceCreated: true,
                            invoiceKey: currentInvoice[currentInvoice.length - 1],
                        }, () => {
                            this.props.pullInvoiceFromDb(this.state.invoiceKey)
                        })
                    }
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
        const dbRef = firebase.database().ref(`users/${this.state.user}/${this.state.invoiceKey}/tasks`)

        const confirmChoice = window.confirm(`Would you like to ${e.target.lastChild.innerHTML}?`);

        // if choice is confirmed, do the following else null
        if(confirmChoice){
            const tasksArr = this.state.tasks ? Array.from(this.state.tasks) : [];
            const task = {
                taskName : e.target[0].value,
                hours: e.target[1].value,
                description: e.target[2].value,
                sum: `${e.target[1].value * this.state.hourlyRate}`,
            }
            
            tasksArr.push(task)
            console.log(tasksArr);
            
            
            this.setState({
                tasks: tasksArr,
            })

            dbRef.push(task)
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="row row__justifyCenter">
                    <div className="inputContainer">
                        <input onChange={this.handleChange} id="client" className="client" type="text" placeholder="Client Name" defaultValue={this.props.openInvoice ? this.props.openInvoice.client : null}/>
                    </div>

                    {/* if there is an open invoice use the last it was modified or created, else create a new date */}
                    <div className="inputContainer">
                        <input onChange={this.handleChange} id="dateCreated" className="dateCreated" type="text" defaultValue={this.state.dateCreated} contentEditable="false"/>
                    </div>

                    <div className="inputContainer">
                        <input onChange={this.handleChange} id="hourlyRate" className="hourlyRate" type="text" defaultValue={this.state.hourlyRate} />
                    </div>

                    {
                    this.state.invoiceCreated || this.props.openInvoice
                    ?
                    <h3>Add New Task</h3>
                    :
                    <button type="submit" >Add Invoice</button>
                    }

                </form >
                {
                // if an invoice was created, of if one is currently open, display the task component,else nothing
                this.state.invoiceCreated || this.props.openInvoice
                ?
                <Task addTask={this.addTask}/>
                :
                null
                }
            </div>
        )
    }
}

export default CreateInvoice;