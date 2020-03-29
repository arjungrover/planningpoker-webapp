import React, { useState, useEffect } from 'react';
import {  withRouter, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { login, clearError } from '../../actions/login';
import './login.css';
import { DASHBOARD, SIGNUP } from '../../constants';


export function LoginComponent(props) {
    
    let loginerror = useSelector(state => state.login.error);
    const loginSuccess = useSelector(state => state.login.user);

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        props.clearError();
    }, [])


    const onInputChange = event => {
        event.persist();
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        const user =  {
            email: state.email,
            password: state.password
        };
        props.login(user);
    };

    const { email, password } = state;
    
    if(loginSuccess && loginerror === false) {
        props.history.push(DASHBOARD);
        props.clearError();
    }

    let login_error = "";

    if(loginerror) {
        login_error = loginerror;
    }

    return (
        <div className="login-component">
            <div className="form-component">
                <form className="login-form" onSubmit={loginSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        placeholder="Password"
                        minLength="8"
                        required
                    />
                    <input
                        type="submit"
                        value="Login"
                        className="login-button"
                    />
                    <p className="login-error">{login_error}</p>
                </form>
                <Link to={SIGNUP}><p className="signup-instead">SignUp as new user</p></Link>
            </div>
        </div>
    );
}

export default connect(null, { login, clearError })(withRouter(LoginComponent));
