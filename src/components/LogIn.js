import React from 'react';

const LogIn = (props) => {
    return (
        <div className="loginForm">
            {
                props.loggedIn
                ?
                <div className="login login__panel row row__padding">
                        <h2 className="heading">Get paid, {props.user.displayName || props.displayName}.</h2>
                    <div className="login login__panel row">
                        <img
                            src={props.user.photoURL || props.photoURL}
                            alt="Welcome to the Invoice Dough"
                            className="login login__profilePic"
                        />
                        <button onClick={props.signOut} className="login login__button login__signOut">Sign Out</button>
                    </div>
                    <div className="login login__panel row ">
                    </div>
                </div>
                :
                <div className="login login__panel row login__welcome">
                    <div>
                        <h1 className="heading">Welcome to Invoice Dough</h1>
                        <h3 className="heading">log in to make some invoices</h3>
                    </div>
                    <div className="row">
                        <button onClick={props.signIn} className="login login__button">Sign In</button>
                    </div>
                    <p>OR</p>
                    <div className="row">
                        <button onClick={props.anonymousLogin}>Use as guest</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default LogIn;