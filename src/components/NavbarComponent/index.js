import React from 'react';
import './Navbar.css';
import { Link, withRouter } from 'react-router-dom';
import { DASHBOARD, LOGIN, SIGNUP } from '../../constants';
import { connect, useSelector } from 'react-redux';
import { logout } from '../../actions/logout';

function NavbarComponent(props) {

    let loggedIn = useSelector(state => state.user.userAuth);

    const logout = () => {
        props.logout();
        props.history.push(LOGIN);
    }

    return (
        <div className="navbar-component">
            <div className="navbar-elements">
                <h1 className="navbar-logo">
                    <Link to="/">Poker Planning</Link>
                </h1>
                <div>
                    {loggedIn &&
                        <div className="navigation-items">
                            <Link to={DASHBOARD}><span className="nav-dashboard nav-items">Dashboard</span></Link>
                            <span className="nav-logout nav-items" onClick={logout}>LOGOUT</span>
                        </div>
                    }
                    {!loggedIn &&
                        <div className="navigation-items">
                            <Link to={SIGNUP}><span className="nav-signup nav-items">SIGN UP</span></Link>
                            <Link to={LOGIN}><span className="nav-login nav-items">LOGIN</span></Link>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default connect(null, { logout })(withRouter(NavbarComponent));
