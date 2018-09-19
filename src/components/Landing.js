import React, { Component } from 'react';
import LogIn from './LogIn';

class Landing extends Component{
    constructor(props){
        super(props);
        // console.log(props);
        
        this.state = {

        }
    }
    render(){
        return(
            <header className={this.props.loggedIn ? "landing landingFalse" : "landing landingTrue"}>
                <LogIn
                    loggedIn={this.props.loggedIn}
                    user={this.props.user}
                    signOut={this.props.signOut}
                    signIn={this.props.signIn}
                    handleSubmit={this.props.handleSubmit}
                    handleChange={this.props.handleChange}
                    anonymousLogin={this.props.anonymousLogin}
                    displayName={this.props.displayName || null}
                    photoURL={this.props.photoURL || null}
                    getInvoices={this.props.getInvoices}
                    passChildState={this.props.passChildState}/>
            </header>
        )
    }
}

export default Landing;