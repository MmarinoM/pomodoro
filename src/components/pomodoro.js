import {Card, Button, ButtonGroup, Alert} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import Breaktime from "./break";
import click from "../audio/click.mp3";
import ding from "../audio/ding.mp3";
import tick from "../audio/tick.mp3";

const Pomodoro = (props) => {
    const [timer, seTimer] = useState(props.workingSession);
    const [breakChoice, setBreakChoice] = useState(props.breakSession);
    const [changeShow, setChangeShow] = useState(false);
    const [isRunning, setRunningState] = useState(false);

    // TODO décompte des secondes
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                seTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    // TODO Affichage des secondes en 00min : 00sec
    function displaytimer(countdown) {
        const seconds = countdown % 60;
        const minutes = parseInt(countdown / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    function playSound(sound, volume = 0.3) {
        const sfx = new Audio(sound);
        sfx.volume = volume;
        sfx.play();
    }
    // TODO Nom de la fonction assez explicite
    function resetTimer() {
        seTimer(props.workingSession);
    }

    useEffect(() => {
        if (timer <= 0 && isRunning) {
            document.title = "Break Time";
            setRunningState(false);
            setChangeShow(!changeShow);
            playSound(ding);
        } else {
            document.title = `WT - ${displaytimer(timer)}`;
        }
        if (isRunning && timer <= 5 && timer > 0) {
            playSound(tick, 0.2);
        }
    }, [timer]);

    return (
        <div className={"w-100 d-flex flex-column align-items-center"}>
            <Card className={"bg-warning mb-3 w-50 mt-5"}>
                <Card.Header className={"bg-warning text-center h3"}>
                    {"Work Timer"}
                </Card.Header>
                <Card.Body>
                    <div className={"d-flex flex-column align-items-center"}>
                        <p className={"time"}>{displaytimer(timer)}</p>
                        <ButtonGroup className={"w-100"}>
                            <Button
                                className={"btn btn-info"}
                                disabled={isRunning}
                                onClick={() => {
                                    seTimer(timer + 60);
                                    playSound(click);
                                }}>
                                {<i class="fas fa-plus"></i>}
                            </Button>
                            <Button
                                className={"btn btn-success"}
                                disabled={timer <= 0}
                                onClick={() => {
                                    setRunningState(!isRunning);
                                    playSound(click);
                                }}>
                                {isRunning ? (
                                    <i className={"fas fa-pause"}></i>
                                ) : (
                                    <i className="fas fa-play"></i>
                                )}
                            </Button>
                            <Button
                                className={"btn btn-danger"}
                                onClick={() => {
                                    resetTimer();
                                    setRunningState(false);
                                    setChangeShow(false);
                                    playSound(click);
                                }}>
                                {<i class="fas fa-undo-alt"></i>}
                            </Button>
                            <Button
                                className={"btn"}
                                disabled={
                                    isRunning || parseInt(timer / 60) % 60 === 0
                                }
                                onClick={() => {
                                    seTimer(timer - 60);
                                    playSound(click);
                                }}>
                                {<i class="fas fa-minus"></i>}
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
            <Card className={"bg-success w-25"}>
                <Card.Header className={"bg-success text-center"}>
                    {"Break Timer"}
                </Card.Header>
                <Card.Body className={"d-flex flex-column align-items-center"}>
                    <p className={"break"}>{displaytimer(breakChoice)}</p>
                    <ButtonGroup className={"w-25"}>
                        <Button
                            className={"btn btn-info"}
                            disabled={isRunning}
                            onClick={() => {
                                playSound(click);
                                setBreakChoice(breakChoice + 60);
                            }}>
                            {"+"}
                        </Button>
                        <Button
                            disabled={
                                isRunning ||
                                parseInt(breakChoice / 60) % 60 === 0
                            }
                            onClick={() => {
                                playSound(click);
                                setBreakChoice(breakChoice - 60);
                            }}>
                            {"-"}
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <Breaktime
                show={changeShow}
                breakSession={breakChoice}
                reset={resetTimer}
                replay={setRunningState}
                hideModal={setChangeShow}
            />
        </div>
    );
};

Pomodoro.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 10,

    //in seconds = 5 min - 300s
    breakSession: 300,
};
export default Pomodoro;
