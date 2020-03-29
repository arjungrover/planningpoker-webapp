import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { signup, clearError } from '../../actions/signup';
import './SignUp.css';


function SignUpComponent(props) {

    let signupError = useSelector(state => state.auth.error);

    const [confirm_password, setConfirmPassword] = useState("");
    const [password_error, setPasswordError] = useState("");
    const [signup_success, setSignUpSuccess] = useState(false);

    const [state, setState] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
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

    const confirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setPasswordError("Passwords not matching");
        }
        else {
            setPasswordError("");
        }
    };

    const signupSubmit = (e) => {
        e.preventDefault();
        if (password_error === "") {
            const user = {
                email: state.email,
                first_name: state.first_name,
                last_name: state.last_name,
                password: state.password
            };
            props.signup(user);
        }
    };

    const { email, password, first_name, last_name } = state;

    let email_error = "";

    if (signupError) {
        email_error = signupError;
    }

    if((signupError === false) && !signup_success) {
        setSignUpSuccess(true);
        props.clearError();
    }

    return (
        <div className="signup-component">
            <div className="form-component">
                { !signup_success &&
                    <form className="signup-form" onSubmit={signupSubmit}>
                        <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={onInputChange}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={last_name}
                            onChange={onInputChange}
                            placeholder="Last Name"
                        />
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
                            type="password"
                            name="confirm_password"
                            value={confirm_password}
                            onChange={confirmPasswordInput}
                            placeholder="Confirm password"
                            required
                        />
                        <p className="password-error">{password_error}</p>
                        <p className="email-error">{email_error}</p>
                        <input
                            type="submit"
                            value="Sign Up"
                            className="signup-button"
                        />
                    </form>
                }
                {signup_success &&
                    <div className="signup-success-div">
                        <p className="signup-success-head">SignUp successful!</p>
                        <p>We've sent a verification link to your email id.</p><p> Click the link to verify</p>
                        or
                    </div>
                }
                <Link to="/login"><p className="login-instead">Login as existing user</p></Link>
            </div>

        </div>
    );
}

export default connect(null, { signup, clearError })(withRouter(SignUpComponent));
