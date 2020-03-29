import React, { useState, useEffect } from 'react'
import './ModalComponent.css'
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { createGroup, clearError } from '../../actions/createGroup'
import { getAllUserDetails } from "../../actions/getAllUserDetails";
import { Multiselect } from 'multiselect-react-dropdown';

function ModalComponent(props) {

    let userlist = useSelector(state => state.getAllUser.usersDetail);
    let createError = useSelector(state => state.group.error);

    const [ userEmails, setUserEmails ] = useState([]);
    
    useEffect(()=>{
        if(!userlist){
         props.getAllUserDetails();
        }
    },[userlist])
    
    useEffect(()=>{
        if(userlist){
            let emails = []
        for(let i=0;i<userlist.length;i++){
            emails.push({emailId :  userlist[i].email, id : i})    
        }
        setUserEmails(emails);
    }
    },[userlist])

    const [state, setState] = useState({
        group_name: "",
        description: ""
    });

    const [grpCreateMsg, setCreateMsg] = useState("");
    const [formHide, setFormState] = useState(true);


    let emailArray = [];

    const onInputChange = event => {
        event.persist();
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    };

    const createSubmit = (e) => {
        e.preventDefault();

        if (state.group_name === "") {
            setCreateMsg("Please enter group name");
            return;
        }
        else if (emailArray.length === 0) {
            setCreateMsg("Please select emails");
            return;
        }
        const group = {
            name: state.group_name,
            description: state.description,
            user: emailArray
        };
        props.createGroup(group);
        props.getAllUserDetails();
    };


    if (createError) {
        props.clearError();
    }
    if (createError === false && formHide === true) {
        setCreateMsg("GROUP CREATED!!");
        setFormState(false);
    }
    
    const onSelectEmail = (selectedlist, selecteditem) =>{
        emailArray.push(selecteditem.emailId);
    }

    const onRemoveEmail = (selectedlist, removeitem) => {
        let ind = emailArray.indexOf(removeitem.emailId);
        emailArray.splice(ind,1);
    }
    
    return (
        <div>
            {formHide &&
                <div className='grp-form' >
                    <label className='grp-text'>Group Name:</label>
                    <br />
                    <div className='fields'>
                        <input type='text'
                            className='grp-fields'
                            name='group_name'
                            value={state.group_name}
                            onChange={onInputChange}
                        />
                    </div>
                    <label className='grp-text'>Group Description:</label>
                    <br />
                    <div className='fields'>
                        <input type='text'
                            className='grp-fields'
                            name='description'
                            value={state.description}
                            onChange={onInputChange}
                        />
                    </div>
                    <br />
                    <div className="multi-selected">
                    <Multiselect
                    options={userEmails}
                    onSelect = {onSelectEmail}
                    onRemove = {onRemoveEmail}
                    placeholder = "select emails" 
                    displayValue = "emailId"
                    />
                    </div>
                    <p className='err-msg'>{grpCreateMsg}</p>


                    <input className='grp-fields' type='submit' value='Create Group' onClick={createSubmit} />
                </div>
            }
        </div>
    )
}

export default connect(null, { createGroup, clearError, getAllUserDetails })(withRouter(ModalComponent));
