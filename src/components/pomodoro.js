import {Card, Button, ButtonGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";

const Pomodoro = (props) => {
    const [timer, seTimer] = useState(props.workingSession);
    const [isRunning, setRunningState] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                seTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    function displaytimer() {
        const seconds = timer % 60;
        const minutes = parseInt(timer / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        document.title = displaytimer();
    });
    function resetTimer() {
        seTimer(props.workingSession);
    }
    return (
        <div className={"w-100 d-flex flex-column align-items-center"}>
            <Card className={"bg-warning mb-3 w-50"}>
                <Card.Body>
                    <div className={"d-flex flex-column align-items-center"}>
                        <p className={"time"}>{displaytimer()}</p>
                        <ButtonGroup className={"w-50"}>
                            <Button
                                className={"btn btn-info"}
                                disabled={isRunning}
                                onClick={() => {
                                    seTimer(timer + 60);
                                }}>
                                {"+"}
                            </Button>
                            <Button
                                className={"btn btn-success"}
                                disabled={timer <= 0}
                                onClick={() => {
                                    setRunningState(!isRunning);
                                }}>
                                {isRunning ? "PAUSE" : "PLAY"}
                            </Button>
                            <Button
                                className={"btn btn-danger"}
                                onClick={() => {
                                    resetTimer();
                                    setRunningState(false);
                                }}>
                                {"RESET"}
                            </Button>
                            <Button
                                className={"btn btn-info"}
                                disabled={
                                    isRunning || parseInt(timer / 60) % 60 === 0
                                }
                                onClick={() => {
                                    seTimer(timer - 60);
                                }}>
                                {"-"}
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

Pomodoro.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 1500,

    //in seconds = 5 min - 300s
    breakSession: 300,
};
export default Pomodoro;
