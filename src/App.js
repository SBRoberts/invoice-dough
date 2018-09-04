import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// Components
import LogIn from './components/LogIn';
import CreateInvoice from './components/CreateInvoice';
import Invoices from './components/Invoices';
import OpenInvoice from './components/OpenInvoice';


class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
        }
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        firebase.auth().signInWithPopup(provider).then((res) => {
            this.setState({
                loggedIn: true,
                user: res.user,
                invoices: [],
            });
        });
    }
    anonymousLogin = () => {
        firebase.auth().signInAnonymously().catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(`Error: ${errorCode} | ${errorMessage}`);
            
        });
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((res) => {
            if (res) {
                // if user is logged in, res will return a truthy value
                console.log('Res is Truthy')
                this.setState({
                    loggedIn: true,
                    user: res,
                    invoices: [],
                })
                this.getInvoices()
                
                if(!this.state.user.displayName){
                    this.setState({
                        displayName: 'Guest',
                        photoURL: 'https://image.flaticon.com/icons/svg/927/927567.svg',
                    })
                }
                
            } else {
                console.log('Res is Falsey')
                this.setState({
                    loggedIn: false,
                    user: {},
                    invoices: [],
                })
            }
        });

    }

    signOut() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
            user: {},
            invoices: [],
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}`)
        dbRef.push(this.state.textField)
        this.setState({
            textField: ''
        })
    }

    handleChange(e) {
        // console.log(e.target)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    toggleInvoice = (bool) => {
        this.setState({
            toggleInvoice: bool,
        })
    }

    getInvoices = () => {
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}/`)
        dbRef.on('value', (snapshot) => {
            
            const invoiceArr = Object.entries(snapshot.val() || [])
            this.setState({
                invoices: invoiceArr,
            })
            
        })
        
    }

    getDate = () => {
        const date = new Date().toString().split(" ").slice(0, 5).join(" ")
        return date
    }

    // get invoice from a click target id
    pullInvoiceFromDb = (e) => {
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}`)

        const invoiceId = e.target.id || e.target.parentElement.parentElement.id;

        if(invoiceId){
            dbRef.child(`${invoiceId}`).on('value', (snapshot) => {
                const openInvoice = snapshot.val()
                const key = snapshot.key
                // if tasks are undefined, return null
                let tasks = [];
                if (openInvoice.tasks){
                    tasks = Object.entries(openInvoice.tasks);
                }
                openInvoice.key = key;
                openInvoice.tasks = tasks;
                
                this.setState({
                    openInvoice,
                })
                
            })
        }
    }

    updateTask = (e) => {
        const key = e.target.parentElement.parentElement.id
        const tasks = document.getElementsByClassName('openInvoice__tasks--item')
        const inputs = tasks[key].getElementsByClassName('openInvoice__task')[0].getElementsByClassName('input')

        // ugly solution, targeting the values of inputs. The dev needs to know which input at each index are holding each value
        const task = {
            taskName: inputs[0].value,
            hours: inputs[1].value,
            description: inputs[3].value,
            sum: `${inputs[1].value * this.state.openInvoice.hourlyRate}`,
        }

        const tempArr = Array.from(this.state.openInvoice.tasks)
        tempArr.forEach((invoice) => {
            if(invoice[0] === key){
                const index = tempArr.indexOf(invoice)
                tempArr[index][1] = task
                return tempArr
            }
            
        });

        this.setState({
            openInvoice: {
                dateModified: this.getDate(),
                tasks: tempArr,
            }
        })
        
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}/${this.state.openInvoice.key}/tasks/${key}`)
        dbRef.update(task)
    }

    // will remove a task, if given an event target id
    removeTask = (e) => {
        const key = e.target.parentElement.parentElement.id
        console.log(key);
        
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}/${this.state.openInvoice.key}/tasks/${key}`)
        dbRef.remove()
        
        console.log('Task Removed');
        
    }

    closeInvoice = () => {
        this.setState({
            openInvoice: null,
        })
    }


    render() {
        return (
            <main className="App">
                <div className="relative">
                    <div className="fixed">
                        <section className="sidePanel hideOnPrint">
                            <LogIn
                                loggedIn={this.state.loggedIn}
                                user={this.state.user}
                                signOut={this.signOut}
                                signIn={this.signIn}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                anonymousLogin={this.anonymousLogin}
                                displayName={this.state.displayName || null}
                                photoURL={this.state.photoURL || null} />
                            <section className="invoices">
                                {
                                // console.log(this.state, this.state.loggedIn, this.state.user.uid)
                                this.state.loggedIn
                                    ?
                                    <Invoices loggedIn={this.state.loggedIn} uid={this.state.user.uid} getInvoices={this.getInvoices} invoices={this.state.invoices} pullInvoice={this.pullInvoiceFromDb} />
                                    :
                                    <div></div>
                                }
                            </section>
                        </section>
                    </div>
                </div>
                <div className="relative">
                    <div className="fixed">
                        <section className="invoiceManager hideOnPrint">
                            {
                                // if user is logged in show stuff, otherwise show nothing
                                this.state.loggedIn
                                    ?
                                    // if invoice toggle state is not true, set it to true on button press
                                    !this.state.toggleInvoice
                                        ?
                                        <div className="row row__justifyCenter row__padding">
                                            <button className="heading" onClick={() => this.toggleInvoice(true)}>Create Invoice +</button>

                                        </div>
                                        :
                                        <div className="row row__justifyCenter row__padding">
                                            <button className="heading" onClick={() => this.toggleInvoice(false)}>Quit</button>
                                        </div>
                                    :
                                    null
                            }
                            {

                                // if toggle invoice is true, add it to this div
                                this.state.toggleInvoice && this.state.loggedIn
                                    ?
                                    <CreateInvoice loggedIn={this.state.loggedIn} uid={this.state.user.uid} getDate={this.getDate} openInvoice={this.state.openInvoice} />
                                    :
                                    null
                            }
                        </section>
                    </div>
                </div>
                <section className="openInvoice printArea">
                {
                    this.state.openInvoice
                    ?
                    <OpenInvoice openInvoice={this.state.openInvoice} closeInvoice={this.closeInvoice} displayName={this.state.user.displayName} updateTask={this.updateTask} removeTask={this.removeTask} user={this.state.user} loggedIn={this.state.loggedIn}/>
                    :
                    null
                }
                </section>
            </main>
        )
    }
}

export default App;
