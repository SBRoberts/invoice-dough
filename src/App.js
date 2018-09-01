import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// Components
import LogIn from './components/LogIn';
import CreateInvoice from './components/CreateInvoice';
import Invoices from './components/Invoices';
import OpenInvoice from './components/OpenInvoice';
import Task from './components/Task';


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

    // on event
    pullInvoiceFromDb = (e) => {
        const dbRef = firebase.database().ref(`users/${this.state.user.uid}`)

        const invoiceId = e.target.id;

        if(invoiceId){
            dbRef.child(`${invoiceId}`).on('value', (snapshot) => {
                const openInvoice = snapshot.val()
                console.log(snapshot)
                const key = snapshot.key
                openInvoice.key = key;
                
                this.setState({
                    openInvoice,
                })
                
            })
        }
    }

    render() {
        return (
            <main className="App">
                <section className="sidePanel">
                    <LogIn
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    signOut={this.signOut}
                    signIn={this.signIn}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    textField={this.state.textField}/>
                    {
                        // if user is logged in show stuff, otherwise show nothing
                        this.state.loggedIn 
                        ?
                            // if invoice toggle state is not true, set it to true on button press
                            !this.state.toggleInvoice
                            ?
                            <div className="row row__justifyCenter row__padding">
                                <button onClick={() => this.toggleInvoice(true)}>Create New Invoice</button>

                            </div>
                            :
                            <div className="row row__justifyCenter row__padding">
                                <button onClick={() => this.toggleInvoice(false)}>Quit Invoice Creation</button>
                            </div>
                        :
                        null
                    }
                    <section className="invoiceManager">
                        {
                            
                            // if toggle invoice is true, add it to this div
                            this.state.toggleInvoice && this.state.loggedIn
                            ?
                            <CreateInvoice loggedIn={this.state.loggedIn} uid={this.state.user.uid} getDate={this.getDate} />
                            :
                            null
                        }
                    </section>
                </section>
                <section className="invoices">
                {
                    // console.log(this.state, this.state.loggedIn, this.state.user.uid)
                    this.state.loggedIn
                    ?
                    <Invoices loggedIn={this.state.loggedIn} uid={this.state.user.uid} getInvoices={this.getInvoices} invoices={this.state.invoices} pullInvoice={this.pullInvoiceFromDb}/>
                    :
                    <div></div>

                }
                </section>
                <section className="openInvoice">
                {
                    this.state.openInvoice
                    ?
                    <OpenInvoice openInvoice={this.state.openInvoice} displayName={this.state.user.displayName}/>
                    :
                    null
                }
                </section>
            </main>
        )
    }
}

export default App;
