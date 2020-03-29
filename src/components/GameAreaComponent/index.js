import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Timer from '../Timer';
import '../PokerBoardComponent/Pokerboard.css';
import socket, { waitForSocketConnection } from '../../services/getWebSocketInstance';
import { getToken } from '../../services/getToken';
import { connect, useSelector } from 'react-redux';
import { cardChosenAction, setTimerSecond, setGameError, setEstimates, changeOnlinePlayers } from '../../actions/changeGameLobby';


export function GameareaComponent(props) {

    const token = getToken();
    const issue = useSelector(state => state.gameLobby.issue);
    const cardList = useSelector(state => state.gameLobby.cardList);
    const currentTimer = useSelector(state => state.gameLobby.currentTimer);
    const pokerboard = useSelector(state => state.pokerboard.pokerboard);

    const [gameCards, setGameCards] = useState([]);
    const [isCardChosen, setIsCardChosen] = useState(false);
    const [target, setTarget] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [gameEstimate, setGameEstimate] = useState("");
    const [gameComment, setGameComment] = useState("");
    const [numberChoosen, setNumber] = useState();
    const [socketObj, setSocketObj] = useState(socket.getInstance(props.match.params.name, token));
    const [estimateMessaage, setEstimateMessage] = useState(null);

    const onTimerOver = () => {
        setGameOver(true);
        props.setTimerZero(true);
        props.setTimerSecond(pokerboard.timer * 0);
    }

    let socketobj = socket.getInstance(props.match.params.name, token);
    useEffect(() => {
        if (currentTimer < 0)
            props.setTimerSecond(0);
        if (issue) {
            setGameCards(pokerboard.series);
            setGameOver(false);
            setGameStart(false);
            setTarget(null);
            setNumber(null);
            props.cardChosenAction([]);
            setEstimateMessage(null);
        }
        if (target) {
            target.style.backgroundColor = 'rgb(221, 217, 201)';
            target.style.boxShadow = '0 0 5px black';
        }
    }, [issue])

    let min = "";
    let sec = "";

    useEffect(() => {
        if (target) {
            target.style.backgroundColor = 'blue';
            target.style.boxShadow = '0 15px 10px blue';
        }
    }, [target])

    socketObj.onmessage = function (e) {
        console.log("e.data game area", e.data)
        if (e.data === "Session Over!!") {
            console.log("session ovevr   djskfdhsk sdfshj")
            socketobj.close();
            socket.deleteInstance();
            props.setGameMode(false);
            props.setGameError(e.data);
        }
        let obj;
        obj = JSON.parse(e.data);
        console.log("obj", obj);
        if (obj.change) {
            let new_issue = pokerboard.issues.filter(issue => issue.id == obj.change)[0];
            props.changeIssue(new_issue);
        }
        if (obj.type === "online Player") {
            props.changeOnlinePlayers(obj.list);
        }
        if (obj.type === "card list") {
            props.cardChosenAction(obj.cards);
        }
        if (obj['startTimer']) {
            props.setTimerSecond(pokerboard.timer * 60);
            setGameStart(true);
        }
        else if (obj['timeleft']) {
            setGameStart(true);
            min = parseInt(obj.timeleft.slice(2, 4));
            sec = parseInt(obj.timeleft.slice(5, 7));
            let num = (pokerboard.timer * 60) - (min * 60 + sec);
            if (num < 0)
                props.setTimerSecond(0);
            else
                props.setTimerSecond(num);
        }
    }

    const cardChosen = (event) => {
        if (target) {
            target.style.backgroundColor = 'rgb(221, 217, 201)';
            target.style.boxShadow = '0 0 5px black';
        }
        let message = {
            type: 'cardChosen',
            data: {
                value: event.target.id,
                issue_id: issue.id
            }
        }
        waitForSocketConnection(socketObj, function () {
            socketObj.send(JSON.stringify(message));
        });
        // socketObj.onopen = function () {
        //     socketObj.send(`select/${event.target.id}/${issue.id}`);
        // }
        // var obj;
        // socketObj.onmessage = function (e) {
        //     console.log(e.data);
        //     obj = JSON.parse(e.data);
        //     console.log(obj);
        //     if (typeof obj.cards != undefined) {
        //         console.log(obj.cards);
        //         setPlayerCards(obj.cards);
        //     }
        //     if(typeof obj.start != undefined){
        //         console.log("game satrted now")
        //     }
        // }
        // socketObj.onopen();

        setTarget(event.target);
        setNumber(event.target.id);
        setIsCardChosen(true);
    }

    const setEstimate = (e) => {
        setGameEstimate(e.target.value);
    }
    const setComment = (e) => {
        setGameComment(e.target.value);
    }
    const exitSubmit = (e) => {
        socketobj.close();
        socket.deleteInstance();
        props.setTimerZero(true);
        props.setTimerSecond(pokerboard.timer * 0);
        props.setGameMode(false);
    }

    const startTimer = (e) => {
        let message = {
            type: 'startTimer'
        }
        socketobj.send(JSON.stringify(message));
        setGameStart(true);
        props.setTimerZero(false);
        props.setTimerSecond(pokerboard.timer * 60);
    }

    const submitEstimate = () => {
        const data = {
            issue_estimate: parseInt(gameEstimate),
            comment: gameComment,
            pokerboard_name: pokerboard.name
        }
        props.setEstimates(data, issue.id);
        setEstimateMessage("Submitted!")
    }

    return (
        issue ? (
            <div className="game-area-flex">
                <div className="game-area-width">
                    <div className="game-component">
                        <div className="issue-details">
                            <div className="issue-summary">
                                {issue.issue_summary}
                            </div>
                            <div className="issue-description">
                                {issue.issue_description}
                            </div>
                        </div>
                    </div>
                    <div className="game-area">
                        <div className="estimated-area">
                            All players' cards:
                            <div className="estimated-area-cards card-list">
                                {cardList.map(card => {
                                    let showCard;
                                    if (gameOver) showCard = card.card;
                                    else {
                                        showCard = pokerboard.isManager ? card.card : "*"
                                    }
                                    return (
                                        <span className="card-with-name">
                                            <div className="card estimated-cards">
                                                {showCard}
                                            </div>
                                            <div className="estimated-player-name">
                                                {card.user}
                                            </div>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        {pokerboard && (pokerboard.role === 2 || pokerboard.isManager) &&
                        <div>
                            {numberChoosen &&
                                <div className="chosen-card-area">
                                    Chosen Card:
                                    <div className="estimated-area-cards card-list">
                                        <span>
                                            <div className="card estimated-cards">
                                                {numberChoosen}
                                            </div>
                                            <div className="estimated-player-name">

                                            </div>
                                        </span>
                                    </div>
                                </div>
                            }
                            <div className="all-card-area">
                                Choose your Estimate:
                                <div className="card-list">
                                    {gameCards.map(card => (
                                        <span id={card} className="card cardSet" onClick={!gameOver && gameStart ? cardChosen : null}>
                                            {card}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="timer-submit-div">
                    <div className="timer">
                        Timer: &nbsp;&nbsp;
                        <span className="timer-time">
                            <Timer secondt={currentTimer} onTimerOver={() => onTimerOver()} />
                            {pokerboard.isManager &&
                                <button className="start-game-btn" onClick={startTimer}>Start</button>
                            }
                            <br />
                            <button className="quit-game-btn" onClick={exitSubmit}>Quit Game</button>
                        </span>
                    </div>
                    {pokerboard.isManager && gameOver &&
                        <div className="game-over">
                            <div className="game-over-form">
                                <textarea
                                    placeholder="Enter Comment"
                                    className="game-estimate-input"
                                    value={gameComment}
                                    onChange={setComment}
                                />
                                <input
                                    type="number"
                                    min="0"
                                    name="gameEstimate"
                                    className="game-estimate-input"
                                    placeholder="Enter Estimate"
                                    value={gameEstimate}
                                    onChange={setEstimate}
                                />
                                <button className="game-submit-button" onClick={submitEstimate}>
                                    Submit
                                </button>
                                { estimateMessaage && 
                                    <div className="estimate-message">
                                        {estimateMessaage}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>

            </div>) : (
                <div className="game-area-flex">
                    Loading
            </div>
            )
    )
}

export default connect(null, { setTimerSecond, changeOnlinePlayers, setEstimates, cardChosenAction, setGameError })(withRouter(GameareaComponent));
