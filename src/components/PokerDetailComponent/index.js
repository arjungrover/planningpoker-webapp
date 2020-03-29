import React from 'react';
import { withRouter } from 'react-router-dom';
import { POKERBOARD } from '../../constants';
import { useSelector, connect } from 'react-redux';
import './PokerDetail.css';


function PokerDetailComponent(props) {

    const pokerboardList = useSelector(state => state.pokerboardList.pokerboardList);

    const enterPokerboard = (name) => {
        let str = name.replace(/\s+/g, '+');
        props.history.push(`${POKERBOARD}${str}`)
    }

    return (
        <div>
        <div className="poker-detail-container">
            <p className="detail-heading">All PokerBoards</p>
            {pokerboardList && pokerboardList.map(pokerboard => {
                let estimate = 0;
                let issue_count = pokerboard.issueList.length;
                for (let i = 0; i < pokerboard.issueList.length; i++) {
                    estimate += pokerboard.issueList[i].issue_estimate;
                }
                return (
                    <div className="poker-detail-card" key={pokerboard.name} onClick={() => enterPokerboard(pokerboard.name)}>
                        <p className="poker-card-name">{pokerboard.name}</p>
                        <p className="poker-card-description">{pokerboard.description}</p>
                        <p className="poker-card-estimated">Estimation: {estimate ? estimate : 0}</p>
                        <p className="poker-card-issues">Issues: {issue_count}</p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default connect(null, null)(withRouter(PokerDetailComponent));
