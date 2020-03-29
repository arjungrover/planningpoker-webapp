import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { verifyToken } from '../../actions/verifyToken';
import './UserVerified.css';
import { LOGIN, DASHBOARD, SIGNUP } from '../../constants';
import { isLoggedIn } from '../../services/isLoggedIn';

export function UserVerified(props) {

    const userVerified = useSelector(state => state.auth.user);
    const userNotVerified = useSelector(state => state.auth.error);

    useEffect(() => {
        props.verifyToken(props.match.params.token);
    }, [])

    let message = "Verifying the user...";

    let description = "";

    if (userVerified) {
        message = userVerified.message;
        description = (
            <Link to={LOGIN}><p className="verified-login">Please Login</p></Link>
        )
    }

    if (userNotVerified) {
        message = userNotVerified.error;
        description = (
            <div className="not-verified-div">
                Please enter correct link or <Link to={SIGNUP}><p className="not-verified-signup">Signup</p></Link>
            </div>
        );
    }

    if (isLoggedIn()) {
        message = "You are already verified";
        description = (
            <Link to={DASHBOARD}><p className="verified-login">Go to Dashboard</p></Link>
        )
    }

    return (
        <div>
            <div className="user-verified">
                <p className="user-verified-head">{message}</p>
                {description}
            </div>
        </div>
    )
}

export default connect(null, { verifyToken })(withRouter(UserVerified));
