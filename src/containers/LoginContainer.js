import React from 'react';
import LoginComponent from '../components/LoginComponent';
import { withRouter } from 'react-router-dom';

function LoginContainer(props) {

    return (
        <div>
            <LoginComponent />
        </div>
    )
}

export default withRouter(LoginContainer);
