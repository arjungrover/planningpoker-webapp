import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import './usergraph.css';
import { getIssuesResponse } from '../../actions/getIssuesResponse';
import { useSelector, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


export function UserGraphComponent(props) {
    const graphData = useSelector(state => state.getIssuesAndUserEstimate.list)


    useEffect(() => {
        props.getIssuesResponse();
    }, [])
    
    var issueEstimate = []
    var userEstimate = []
    var labelSet = []

    if (graphData) {
        for( let i=0;i<graphData.length; i++){
            issueEstimate.push(graphData[i].issue_estimate)
            userEstimate.push(graphData[i].card_selected)
        }    
        var i;
        for( let i=0; i<graphData.length; i++) {
            labelSet[i]= 'issue' + (i+1) ;
        }
    }


    const data = {
        labels: labelSet,
        datasets:[
        {
            label: 'Issue Estimate',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data : issueEstimate
        },
        {
            label: 'User Estimate',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,102,0,1)',
            borderColor: 'rgba(0,102,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,102,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,102,0,1)',
            pointHoverBorderColor: 'rgba(0,102,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data : userEstimate
        }
    ]
    };

    return (
        <div className='box'>
            <br/>
            <br/>
            <Line data={data} />
        </div>
    )
}

export default connect(null, { getIssuesResponse })(withRouter(UserGraphComponent))
