import React, { useState } from 'react';
import './DashboardSidebar.css';
import { withRouter, Link } from 'react-router-dom';
import ModalComponent from '../ModalComponent';
import { CREATE_POKERBOARD, USER_GRAPH } from '../../constants';


function DashboardSidebar(props) {
    
    const [show, setShow] = useState(false);

    const NewPokerSubmit = () => {
        props.history.push(CREATE_POKERBOARD);
    }

    const changeFormState = () => {
        setShow(!show);
    }


    return (
        <div className="dashboard-sidebar">
            <div className="show-graph">
                <Link to={USER_GRAPH}>Estimate Graph</Link>
            </div>
            <div className="dashboard-sidebar-container"> 
                <button
                    className="btn new-grp-btn"
                    onClick={changeFormState}
                >NEW GROUP</button>
                <button
                    type="submit"
                    className="btn new-poker-btn"
                    onClick={NewPokerSubmit} >NEW POKERBOARD
                </button>
            </div>
            {show && <ModalComponent />}
        </div>
    )
}

export default withRouter(DashboardSidebar);
