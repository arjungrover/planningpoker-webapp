import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Pokerboard.css';
import { getPokerboard } from '../../actions/getPokerboard';
import { connect, useSelector } from 'react-redux';
import GameareaComponent from '../GameAreaComponent';
import { getToken } from '../../services/getToken';
import socket, { waitForSocketConnection } from '../../services/getWebSocketInstance';
import { changeIssue, changeOnlinePlayers, clearGameError } from '../../actions/changeGameLobby';
import { createIssues } from "../../actions/createIssues";
import { getSearchResultFromJira, clearJiraSearch } from "../../actions/getSearchResultFromJira";
import { SETTINGS } from "../../constants";
import Modal from "react-modal";
import Select from "react-select";
import SearchField from "react-search-field";
import Collapsible from 'react-collapsible';


export function PokerBoardComponent(props) {
    const token = getToken()

    const pokerboard = useSelector(state => state.pokerboard.pokerboard);
    const pokerboardError = useSelector(state => state.pokerboard.error);
    const currentIssue = useSelector(state => state.gameLobby.issue);
    const onlinePlayers = useSelector(state => state.gameLobby.players);
    const gameError = useSelector(state => state.gameLobby.error);
    let jiraSearchResult = useSelector(state => state.jiraSearch.jiraSearch);
    let jiraSearchError = useSelector(state => state.jiraSearch.error);

    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [gameMode, setGameMode] = useState(false);
    const [issueDisplayIndex, setIssueDisplayIndex] = useState(null);
    const [jiraModalVisibility, setJiraModalVisibility] = useState(false);
    const [customModalVisibility, setCustomModalVisibility] = useState(false);
    const [customStoryID, setCustomStoryID] = useState(1);
    const [customStories, setCustomStories] = useState([]);
    const [jiraStories, setJiraStories] = useState([]);
    const [storyType, setStoryType] = useState("JIRA");
    const [timerZero, setTimerZero] = useState(true);
    const [searchError, setSearchError] = useState("");

    const [customStory, setCustomStory] = useState({
        id: null,
        issue_type: "Custom",
        issue_summary: "",
        issue_description: "",
        jira_id: null
    });

    const [selectedtype, setSelectedtype] = useState({
        value: "JIRA",
        label: "JIRA"
    });

    useEffect(() => {
        setJiraStories([]);
        if (jiraSearchResult) {
            let jirastories = [];
            for (let ind = 0; ind < jiraSearchResult.length; ind++) {
                const newStory = {
                    issue_type: "JIRA",
                    issue_summary: jiraSearchResult[ind].summary,
                    issue_description: jiraSearchResult[ind].description,
                    jira_id: parseInt(jiraSearchResult[ind].id)
                };
                jirastories.push(newStory);
            }
            setJiraStories(jirastories);
        }
    }, [jiraSearchResult]);

    useEffect(() => {
        if (jiraSearchError) {
            setJiraStories([]);
        }
    }, [jiraSearchError]);

    const settingButtonClicked = () => {
        let name = props.match.params.name;
        props.history.push(`${SETTINGS}/${name}`);
    };

    const openJiraModal = () => {
        setJiraModalVisibility(true);
    };

    const closeJiraModal = () => {
        props.clearJiraSearch();
        setSearch("");
        setJiraModalVisibility(false);
    };

    const openCustomModal = () => {
        setCustomModalVisibility(true);
    };
    const closeCustomModal = () => {
        setCustomStories([]);
        setCustomModalVisibility(false);
    };

    const customStyles = {
        menu: (provided, chipState) => ({
            ...provided,
            borderBottom: "1px solid pink",
            color: chipState.isSelected ? "red" : "blue",
            padding: 10
        }),
        singleValue: (provided, chipState) => {
            const opacity = chipState.isDisabled ? 0.5 : 1;
            const transition = "opacity 300ms";
            return { ...provided, opacity, transition };
        }
    };

    const story_type = [
        { value: "JIRA", label: "JIRA" },
        { value: "Custom", label: "Custom" }
    ];

    const handleChange = e => {
        setSelectedtype({
            value: e.value,
            label: e.label
        });
        setStoryType(e.value);
    };

    const changeCustomStoryState = e => {
        e.persist();
        setCustomStory(state => ({
            ...customStory,
            [e.target.name]: e.target.value
        }));
    };

    const addCustomStory = e => {
        e.preventDefault();
        setCustomStoryID(customStoryID + 1);
        const newStory = customStories.concat({
            ...customStory,
            id: customStoryID
        });
        setCustomStory({
            issue_type: "Custom",
            issue_summary: "",
            issue_description: "",
            jira_id: null
        });
        setCustomStories(newStory);
    };

    const removeCustomStory = e => {
        let id = e.target.getAttribute("id");
        let deletestory = customStories.filter(story => story.id !== parseInt(id));
        setCustomStories(deletestory);
    };

    const searchChange = value => {
        setSearch(value);
    };

    const searchSubmit = () => {
        if(searchError === "") {
            setSearchError("Search cannot be empty");
        }
        else {
            props.getSearchResultFromJira(search);
            setSearchError("");
        }
    };

    const deleteIssue = e => {
        let id = e.target.getAttribute("id");
        let deletestory = jiraStories.filter(
            story => parseInt(story.jira_id) !== parseInt(id)
        );
        setJiraStories(deletestory);
    };

    const createCustomStories = () => {
        let name = props.match.params.name;
        let stories = customStories;
        for (let i = 0; i < stories.length; i++) {
            delete stories[i].id;
        }
        const story = {
            name: pokerboard.name,
            stories: stories
        };
        props.createIssues(story);
        props.getPokerboard(name);
        setCustomStories([]);
    };

    const addJiraStories = () => {
        let name = props.match.params.name;
        let stories = jiraStories;
        for (let i = 0; i < stories.length; i++) {
            delete stories[i].id;
        }
        const story = {
            name: pokerboard.name,
            stories: stories
        };
        props.createIssues(story);
        props.getPokerboard(name);
        setJiraStories([]);
    };

    function sendMessage(ws) {
        let issue_id;
        if (pokerboard && issueDisplayIndex >= 0) {
            issue_id = pokerboard.issues[issueDisplayIndex].id;
            let message = {
                type: 'changeIssue',
                data: {
                    issue_id: issue_id
                }
            }
            waitForSocketConnection(ws, function () {
                ws.send(JSON.stringify(message));
            });
        }
    }

    useEffect(() => {
        if (issueDisplayIndex !== null) {
            let ws = socket.getInstance(props.match.params.name, token);
            sendMessage(ws);
        }
        else {
            setGameMode(false)
        }
        if (pokerboard) {
            props.changeIssue(pokerboard.issues[issueDisplayIndex])
        }
    }, [issueDisplayIndex])

    useEffect(() => {
        let name = props.match.params.name;
        name = name.replace(/\+/g, " ");
        props.getPokerboard(name);
    }, [])


    let estimate = 0;
    if (pokerboard) {
        for (let i = 0; i < pokerboard.issues.length; i++) {
            estimate += pokerboard.issues[i].issue_estimate;
        }
    }

    const startGame = () => {
        setGameMode(true);
        setIssueDisplayIndex(0);
    }

    const joinGame = () => {
        let ws = socket.getInstance(props.match.params.name, token);
        ws.onmessage = function (e) {
            if (e.data === 'ACCESS DENIED') {
                setErrorMessage("Game not started");
                socket.deleteInstance();
            }
            else {
                let message = {
                    type: 'startGame'
                }
                waitForSocketConnection(ws, function () {
                    ws.send(JSON.stringify(message));
                });
                let obj = JSON.parse(e.data);
                if (obj.issue_id) {
                    let new_issue = pokerboard.issues.filter(issue => issue.id == obj.issue_id)[0];
                    props.changeIssue(new_issue);
                    setGameMode(true);
                }
            }
        }
    }

    const nextIssue = () => {
        if(timerZero)
        if (issueDisplayIndex < pokerboard.issues.length - 1) {
            setIssueDisplayIndex(issueDisplayIndex + 1);
        }
        else if (issueDisplayIndex === pokerboard.issues.length -1) {
            let name = props.match.params.name;
            props.getPokerboard(name);
            setGameMode(false);
        }
    }

    const prevIssue = () => {
        if(timerZero)
        if (issueDisplayIndex > 0) {
            setIssueDisplayIndex(issueDisplayIndex - 1);
        }
    }

    if (gameError) {
        setErrorMessage(gameError);
        props.clearGameError();
    }

    return (
        !pokerboardError ? (
            <div>
                {!gameMode ?
                    (pokerboard &&
                        <div className="pokerboard-container">
                            {pokerboard.isManager && (
                                <Collapsible trigger="Pokerboard Options">
                                    <div className="add-stories-container">
                                        <div className="add-stories-div">
                                            <label className="add-story-label"> Add Stories:</label>
                                            <Select
                                                className="SelectBox selectStoryType"
                                                name="issue_type"
                                                placeholder="Select Story"
                                                styles={customStyles}
                                                searchable={false}
                                                onChange={handleChange}
                                                value={selectedtype}
                                                options={story_type}
                                            />
                                            {storyType === "JIRA" && (
                                                <button className="open-modal-btn" onClick={openJiraModal}>
                                                    SEARCH JIRA STORIES
                                                </button>
                                            )}
                                            {storyType === "Custom" && (
                                                <button
                                                    className="open-modal-btn"
                                                    onClick={openCustomModal}
                                                >
                                                    CREATE STORIES
                                                </button>
                                            )}
                                        </div>
                                        <button className="poker-settings-btn" onClick={settingButtonClicked}>
                                            Role Settings
                                        </button>
                                    </div>
                                </Collapsible>
                            )}
                            <div className="pokerboard-details-button">
                                <div className="pokerboard-details">
                                    <p className="pokerboard-name">{pokerboard.name}</p>
                                    <p>Manager: &nbsp;<span className="pokerboard-manager">{pokerboard.manager}</span></p>
                                    <p>Estimation: &nbsp;<span className="pokerboard-estimate"> {estimate ? estimate : 0}</span></p>
                                </div>
                                {pokerboard.isManager &&
                                    <button className="start-game-button" onClick={startGame}>Start Game</button>
                                }
                                {!pokerboard.isManager &&
                                    <div>
                                        <span className="game-error-message">{errorMessage}</span>
                                        <button className="join-game-button" onClick={joinGame}>Join Game</button>
                                    </div>
                                }
                            </div>

                            {pokerboard.issues.map(issue => {
                                if (issue.issue_estimate === 0) {
                                return (
                                    <div className="issue-list" key={issue.id}>
                                        <p className="issue-list-summary">{issue.issue_summary}</p>
                                        <p className="issue-list-description">{issue.issue_description}</p>
                                        <p className="issue-list-estimate">Not estimated</p>
                                    </div>
                                    )
                                }
                                else {
                                return (
                                    <div className="issue-list" key={issue.id}>
                                        <p className="issue-list-summary">{issue.issue_summary}</p>
                                        <p className="issue-list-description">{issue.issue_description}</p>
                                        <p className="issue-list-estimate">Estimate: {issue.issue_estimate}</p>
                                    </div>
                                )
                            }
                        })}
                        </div>
                    ) :
                    (pokerboard &&
                        <div className="pokerboard-container">
                            {pokerboard.isManager &&
                                <div className="game-navbar">
                                    <button className="prev-issue nav-btn" onClick={prevIssue}>&lt; Previous</button>
                                    <button className="next-issue nav-btn" onClick={nextIssue}>Next &gt;</button>
                                </div>
                            }
                            <div className="game-component-flex">
                                <GameareaComponent {...props} setGameMode={setGameMode} setTimerZero={setTimerZero} />
                                <div>
                                    {onlinePlayers &&
                                        <div className="online-players">
                                            Online:
                                            <ul className="online-players-list">
                                                {onlinePlayers.map(player => (
                                                    <li>{player}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    <Modal
                        isOpen={jiraModalVisibility}
                        onRequestClose={closeJiraModal}
                        contentLabel="JIRA STORY MODAL"
                    >
                    <SearchField
                        className="search-field"
                        placeholder="Search..."
                        value={search}
                        onEnter={searchSubmit}
                        onSearchClick={searchSubmit}
                        onChange={searchChange}
                    />
                    <div className="jira-search-error">{searchError}</div>
                    <div className="jira-add-btn-field">
                        <button className="jira-modal-add-btn" onClick={addJiraStories}>
                            Add Stories
                        </button>
                    </div>

                    <div className="jira-modal-close-field">
                        <button className="jira-modal-close-btn" onClick={closeJiraModal}>
                            Close
                        </button>
                    </div>

                    {jiraStories &&
                        !jiraSearchError &&
                        jiraStories.map(story => (
                            <div className="jira-story-detail">
                                <p>{story.issue_description}</p>
                                <p>{story.issue_summary}</p>
                                <span
                                    className="close-jira"
                                    id={story.jira_id}
                                    onClick={deleteIssue}
                                >
                                    X
                                </span>
                            </div>
                        ))}
                    {jiraSearchError && (
                        <div className="txt-error">{jiraSearchError.data}</div>
                    )}
                    <br />
                </Modal>

                <Modal
                    isOpen={customModalVisibility}
                    onRequestClose={closeCustomModal}
                    contentLabel="CUSTOM STORY MODAL"
                >
                    <div>
                        <label>Create Stories:</label>
                        <form onSubmit={addCustomStory}>
                            <div className="custom-inp-field">
                                <input
                                    type="text"
                                    name="issue_summary"
                                    value={customStory.issue_summary}
                                    onChange={changeCustomStoryState}
                                    className="custom-story-input"
                                    placeholder="Summary.."
                                />
                            </div>
                            <div className="custom-inp-field">
                                <input
                                    type="text"
                                    name="issue_description"
                                    value={customStory.issue_description}
                                    onChange={changeCustomStoryState}
                                    className="custom-story-input"
                                    placeholder="Description.."
                                />
                            </div>
                            <div className="custom-inp-field">
                                <input
                                    type="submit"
                                    className="add-custom-btn"
                                    onClick={addCustomStory}
                                    value="ADD"
                                />
                            </div>
                        </form>
                        {customStories.map(story => (
                            <div className="custom-story-detail">
                                <p>{story.issue_summary}</p>
                                <p>{story.issue_description}</p>
                                <span
                                    id={story.id}
                                    className="remove-custom-story"
                                    onClick={removeCustomStory}
                                >
                                X
                                </span>
                            </div>
                        ))}
                        <div className="create-btn-field">
                            <button
                                className="create-custom-story-btn"
                                onClick={createCustomStories}
                            >
                                Create
                            </button>
                        </div>
                        <div className="close-btn-field">
                            <button
                                className="close-custom-story-btn"
                                onClick={closeCustomModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        ) : (
                <div className="pokerboard-container">
                    Role does not exist or the User is not invited
            </div>
            )
    );
}

export default connect(null, { getPokerboard, changeIssue, changeOnlinePlayers, clearGameError, getSearchResultFromJira, createIssues, clearJiraSearch })(withRouter(PokerBoardComponent));
