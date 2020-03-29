import React, { useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import PokerDetailComponent from '../components/PokerDetailComponent';
import '../components/PokerDetailComponent/PokerDetail.css';
import { withRouter } from 'react-router-dom';
import { getUserDetails } from '../actions/getUserDetails';
import { getAllPokerboards } from '../actions/getAllPokerboards';
import { connect } from 'react-redux';

function Dashboard(props) {

    useEffect(() => {
        props.getUserDetails();
        props.getAllPokerboards();
    }, [])

    return (
        <div className="dashboard-container">
            <DashboardSidebar />
            <PokerDetailComponent />
        </div>
    )
}

export default connect(null, { getUserDetails, getAllPokerboards })(withRouter(Dashboard));
