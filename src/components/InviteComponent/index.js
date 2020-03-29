import React, { useState, useEffect } from 'react';
import './invite.css'
import { createAcceptRequest } from '../../actions/createAcceptRequest'
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

export function InviteComponent(props) {

    let createError = useSelector(state => state.accept.error);

    const [inviteMsg, setStateMsg] = useState("")
    const [hide, setHideState] = useState(true)


    useEffect(() => {
        const accept = {
            poker_id: props.match.params.pokerId,
            email_id: props.match.params.emailId,
            accept: null
        }
        props.createAcceptRequest(accept);
    }, [createError])

    const createAcceptSubmit = (e) => {
        e.preventDefault();
        const accept = {
            poker_id: props.match.params.pokerId,
            email_id: props.match.params.emailId,
            accept: true
        }
        props.createAcceptRequest(accept);
        setHideState(false);
        setStateMsg("REQUEST ACCEPTED!!")
    }


    const createRejectSubmit = (e) => {
        e.preventDefault();
        const accept = {
            poker_id: props.match.params.pokerId,
            email_id: props.match.params.emailId,
            accept: false
        }
        props.createAcceptRequest(accept);
        setStateMsg("REQUEST REJECTED!!")
    }
    return (
        <div>
            {!createError &&
                <div>
                    {hide &&
                    <div>
                    <p className="accept-txt">Please click on this button for Accepting the Request:</p>
                    <button className="accept-btn" onClick={createAcceptSubmit}>ACCEPT REQUEST</button>
                    </div>
                    }   
                    <br />
                    </div>
            }
            {createError && <div className="errorMsg">{createError}</div>}
            <h4 className="msg-invite">{inviteMsg}</h4>
        </div>
    )
}

export default connect(null, { createAcceptRequest })(withRouter(InviteComponent));
