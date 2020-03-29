import React, { useState } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { createPokerBoard, clearError } from '../../actions/createPokerBoard';
import { connect, useSelector } from 'react-redux';
import './pokerboard.css';
import { DASHBOARD } from '../../constants';
import ReactChipInput from "react-chip-input";
import { getJiraIssues } from '../../actions/getJiraIssues';


export function CreatePokerBoardComponent(props) {

    const storeError = useSelector(state => state.createpb.error);

    const [chipState, setChipState] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ value: '1', label: 'Fibonacci' });
    const [errorstate, seterrorstate] = useState("");

    const [state, setState] = useState({
        name: "",
        description: "",
        range: 10,
        timer: 1,
        customId : "",
    });

    const customStyles = {
        menu: (provided, chipState) => ({
            ...provided,
            borderBottom: '1px solid pink',
            color: chipState.isSelected ? 'red' : 'blue',
            padding: 10,
        }),
        singleValue: (provided, chipState) => {
            const opacity = chipState.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    };

    const addChip = value => {
        seterrorstate("");
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!value) {
            seterrorstate("Can't be empty !!");
            return;
        } else if (!emailPattern.test(value)) {
            seterrorstate("Invalid Email !!");
            return;
        } else {
            const chips = chipState.slice();
            for (var i = 0; i < chips.length; i++) {
                if (chips[i] === value) {
                    seterrorstate("Duplicate Email !!");
                    return;
                }
            }
            chips.push(value);
            setChipState(chips);
        }
    };

    const removeChip = index => {
        const chips = chipState.slice();
        chips.splice(index, 1);
        setChipState(chips);
    };

    const options = [
        { value: '1', label: 'Fibonnaci' },
        { value: '2', label: 'Even' },
        { value: '3', label: 'Odd' }
    ];

    const handleChange = event => {
        setSelectedOption({
            value: event.value,
            label: event.label
        })
    };

    const onInputChange = event => {
        event.persist();
        seterrorstate("");
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const createSubmit = (e) => {
        e.preventDefault();
        
        const pokerboard = {
            name: state.name,
            description: state.description,
            card_limit: state.range,
            timer: parseInt(state.timer),
            invite_email: chipState,
            card_set: parseInt(selectedOption.value),
            custom_id : state.customId
        };

        if (pokerboard.name.length === 0) {
            seterrorstate("Enter Game Name !!");
            return;
        }
        else if (pokerboard.description.length === 0) {
            seterrorstate("Enter Description !!");
            return;
        }
        else {
            props.createPokerBoard(pokerboard);
        }
    };

    if (storeError && errorstate === "") {
        seterrorstate(storeError);
    }

    if (storeError === false) {
        props.history.push(DASHBOARD);
        props.clearError();
    }

    return (
        <div className="createpokerboard">
            <div className="pokerboard-component">            
                <form className="pokerboard-form"  >
                    <div className="Field">
                        <label>Game Name :</label>
                        <div className="InputBox">
                            <input
                                type="text"
                                name="name"
                                placeholder="Game Name"
                                value={state.name}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="Field">
                        <label>Description :</label>
                        <div className="InputBox">
                            <input
                                type="textbox"
                                name="description"
                                placeholder="Description"
                                value={state.description}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="Field">
                        <label>Card Set: </label>
                        <Select
                            className="SelectBox"
                            styles={customStyles}
                            name="cardSet"
                            placeholder="Select card set"
                            searchable={false}
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>

                    <div className="Field">
                        <label>Max Card Value:</label>
                        <div className="InputBox">
                            <input
                                className="valuebox"
                                type="number"
                                name="range"
                                min="10"
                                max="100"
                                onChange={onInputChange}
                                value={state.range}
                                required
                            />
                        </div>
                    </div>

                    <div className="Field">
                        <label>Timer (for each issue in minutes):</label>
                        <div className="InputBox">
                            <input
                                className="valuebox"
                                type="number"
                                name="timer"
                                min="1"
                                max="100"
                                onChange={onInputChange}
                                value={state.timer}
                                required
                            />
                        </div>
                    </div>

                    <div className="Field">
                        <label>Invite via Email:</label>
                        <div className="InputBox">
                            <ReactChipInput
                                chips={chipState}
                                onSubmit={value => addChip(value)}
                                onRemove={index => removeChip(index)}
                            />
                        </div>
                    </div>
                    <div className="Field">
                   <label>Enter Custom Id:</label>
                    <div className="InputBox">
                        <input 
                         type="text"
                         name="customId"
                         onChange={onInputChange}
                         value={state.customId}
                         />
                    </div>

                    </div>

                    <div className="Field">
                        <div className="InputBox">
                            <input
                                type="submit"
                                value="CREATE"
                                className="Create-Button"
                                onClick={createSubmit}
                            />
                        </div>
                    </div>
                </form>
        </div>
    </div>
    )
}
export default connect(null, {  createPokerBoard, getJiraIssues, clearError })(withRouter(CreatePokerBoardComponent));
