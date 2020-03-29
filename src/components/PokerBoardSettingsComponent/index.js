import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getPokerboard } from '../../actions/getPokerboard';
import { updatePokerboard } from "../../actions/updatePokerboard";
import './PokerSettings.css';
import Select from 'react-select';
import { Multiselect } from 'multiselect-react-dropdown';
import { getGroupDetail } from "../../actions/getGroupDetail";
import { getAllUserDetails } from "../../actions/getAllUserDetails";
import { addUserRole } from "../../actions/addUserRole";
import { addGroupRole } from "../../actions/addGroupRole";
import { POKERBOARD } from '../../constants';


function PokerBoardSettingsComponent(props) {

    let pokerboard = useSelector(state => state.pokerboard.pokerboard);
    let groups = useSelector(state => state.getGroupNames.names);
    let userlist = useSelector(state => state.getAllUser.usersDetail);
    let thisUser = useSelector(state => state.user.user);

    const [userRoleValue, setUserRoleValue] = useState({ value: 2, label: 'PLAYER' })
    const [groupRoleValue, setGroupRoleValue] = useState({ value: 2, label: 'PLAYER' })
    const [userNames, setUserNames] = useState([]);
    const [groupNames, setGroupNames] = useState([]);
    const [userList, setUserList] = useState([]);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        props.getAllUserDetails()
        props.getGroupDetail()
    }, [])

    useEffect(() => {
        if (userlist) {
            let user_list = []
            for (let i = 0; i < userlist.length; i++) {
                if(userlist[i].email !== thisUser.email)
                user_list.push({ name: userlist[i].email, id: i })
            }
            setUserNames(user_list);
        }
    }, [userlist])

    useEffect(() => {
        if (groups) {
            let group_list = []
            for (let i = 0; i < groups.length; i++) {
                group_list.push({ name: groups[i].name, id: i })
            }
            setGroupNames(group_list)
        }
    }, [groups])

    const options = [
        { value: 2, label: "PLAYER" },
        { value: 3, label: "SPECTATOR" }
    ]

    useEffect(() => {
        let name = props.match.params.name;
        props.getPokerboard(name);
    }, [])

    const onAddUser = (selectedlist, selecteditem) => {
        setUserList(userList.concat(selecteditem));
    }

    const onRemoveUser = (selectedlist, removeitem) => {
        const users = [...userList];
        const index = userList.indexOf(removeitem);
        if (index !== -1) {
            users.splice(index, 1);
            setUserList(users);
        }
    }

    const onAddGroup = (selectedlist, selecteditem) => {
        setGroupList(groupList.concat(selecteditem))
    }

    const onRemoveGroup = (selectedlist, removeitem) => {
        const groups = [...userList];
        const index = groupList.indexOf(removeitem);
        if (index !== -1) {
            groups.splice(index, 1);
            setUserList(groups);
        }
    }

    const userRoleChange = (e) => {
        setUserRoleValue({
            value: e.value,
            label: e.label
        })
    }

    const groupRoleChange = (e) => {
        setGroupRoleValue({
            value: e.value,
            label: e.label
        })
    }

    const addGroupSubmit = () => {
        const name = pokerboard.name;
        let group = []
        for ( let i=0;i<groupList.length;i++){
            group.push(groupList[i].name)
        }
        const groups = {
            group: group,
            role_group: groupRoleValue.value,
            pokerboard_name: name
        }
        props.addGroupRole(groups);
        
    }

    const addUserSubmit = () => {
     const name = pokerboard.name;
       let user = []
       
       for(let i=0;i<userList.length;i++){
           user.push(userList[i].name);
       }
        const users = {
            users: user,
            role_users: userRoleValue.value,
            pokerboard_name: name
        }
        props.addUserRole(users);
    }

    const closeSettings = () => {
        const str = props.match.params.name;
        props.history.push(`${POKERBOARD}${str}`);
    }

    return (
        <div className="edit-poker-container">

            <div className="user-add-list">
                <label className="user-label">Add Groups</label>
                <Multiselect
                    options={groupNames}
                    onSelect={onAddGroup}
                    onRemove={onRemoveGroup}
                    displayValue="name"
                    placeholder="ADD GROUPS..."
                />
            </div>
            <div className="select-user-list">
                <label className="select-role-label">Select Role</label>
                <Select
                    options={options}
                    value={groupRoleValue}
                    onChange={groupRoleChange}
                />
            </div>
            <div className="add-grp-btn">
                <input type="submit" value="ADD GROUPS" className="submit-btn-grp" onClick={addGroupSubmit} />
            </div>

            <div className="user-add-list">
                <label className="user-label">Add Users</label>
                <Multiselect
                    options={userNames}
                    onSelect={onAddUser}
                    onRemove={onRemoveUser}
                    displayValue="name"
                    placeholder="ADD USERS..."
                />
            </div>
            <div className="select-user-list">
                <label className="select-role-label">Select Role</label>
                <Select
                    options={options}
                    value={userRoleValue}
                    onChange={userRoleChange}
                />
            </div>
            <input type="submit" value="ADD USERS" className="add-user-btn" onClick={addUserSubmit} />
            <button className="close-settings-btn" onClick={closeSettings}>Close</button>

        </div>
    )

}
export default connect(null, { getPokerboard, updatePokerboard, getGroupDetail, getAllUserDetails , addUserRole, addGroupRole})(withRouter(PokerBoardSettingsComponent));
