import React from 'react';

const LogIn = (props) => {
    return (
        <div className="loginForm">
            {
                props.loggedIn ?
                    <div className="login login__panel row row__padding">
                        <h1>Get paid, {props.user.displayName}!</h1>
                        <div className="row row__justifyCenter">
                            <img
                                src={props.user.photoURL}
                                alt={props.user.displayName}
                                className="login login__profilePic"
                            />
                        </div>
                        <div className="row row__justifyCenter row__padding">
                            <button onClick={props.signOut} className="login login__button">Sign Out</button>
                        </div>
                    </div>
                    :
                    <div className="login row row__justifyCenter row__padding">
                        <h1>Hiya!</h1>
                        <button onClick={props.signIn} className="login login__button">Sign In</button>
                    </div>
            }
        </div>
    )
}

export default LogIn;