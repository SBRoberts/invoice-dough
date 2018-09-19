import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

class LogIn extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
        }
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
                // this.props.getInvoices()

                if (!this.state.user.displayName) {
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

    signIn = () => {
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

    signOut = () => {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
            user: {},
            invoices: [],
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        // const dbRef = firebase.database().ref(`users/${this.state.user.uid}`)
        // dbRef.push(this.state.textField)
        // this.setState({
        //     textField: ''
        // })
    }
    render(){
        return (
            <div className="loginForm">
                {
                    this.state.loggedIn
                        ?
                        <div className="login login__panel row row__padding">
                            <h2 className="heading">Get paid, {this.state.user.displayName || this.state.displayName}.</h2>
                            <div className="login login__panel row">
                                <img
                                    src={this.state.user.photoURL || this.state.photoURL}
                                    alt="Welcome to the Invoice Dough"
                                    className="login login__profilePic"
                                />
                                <Link to="/">
                                    <button onClick={this.signOut} className="login login__button login__signOut">Sign Out</button>
                                </Link>
                            </div>
                            <div className="login login__panel row ">
                            </div>
                        </div>
                        :
                        <div className="login login__panel row login__welcome">
                            <div>
                                <h1 className="heading">Invoice Dough</h1>
                                <h3 className="heading">Create & Manage Invoices</h3>
                            </div>
                            <div className="row row__justifyCenter">
                                <Link to="/invoices">
                                    <button onClick={this.signIn} className="login login__button">Sign In</button>
                                </Link>
                            </div>
                            <p>OR</p>
                            <div className="row row__justifyCenter">
                                <Link to="/invoices">
                                    <button onClick={this.anonymousLogin}>Use as guest</button>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default LogIn;