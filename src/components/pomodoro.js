import {Card, Button, ButtonGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import Breaktime from "./break";

const Pomodoro = props => {
    const [timer, seTimer] = useState(props.workingSession);
    const [changeShow, setChangeShow] = useState(false);
    // const [breakTime, setBreaktime] = useState(props.breakSession);
    const [isRunning, setRunningState] = useState(false);
    // BOOTSTRAP MODAL
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    //
    // *! décompte des secondes
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                seTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    // *! Affichage des secondes en 00min : 00sec
    function displaytimer() {
        const seconds = timer % 60;
        const minutes = parseInt(timer / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    // function displaybreak() {
    //     const seconds = breakTime % 60;
    //     const minutes = parseInt(breakTime / 60) % 60;
    //     function addLeadingZeroes(time) {
    //         return time < 10 ? `0${time}` : time;
    //     }
    //     return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    // }
    // *! Script fin de décompte + affichage du décompte dans title
    useEffect(() => {
        if (timer <= 0 && isRunning) {
            document.title = "NIQUE TA MERE";
            setRunningState(false);
            setChangeShow(true);
        } else {
            document.title = displaytimer();
        }
    }, [timer]);
    // *! Nom de la fonction assez explicite
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

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header className={"bg-success"} closeButton>
                    <Modal.Title>{"BREAK TIME"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"bg-success time"}>
                    {displaybreak()}
                </Modal.Body>
                <Modal.Footer className={"bg-success"}>
                    <Button variant={"danger"} onClick={handleClose}>
                        {"Close"}
                    </Button>
                    <Button variant={"warning"} onClick={handleClose}>
                        {"Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <Breaktime show={changeShow} />
        </div>
    );
};

Pomodoro.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 5,

    //in seconds = 5 min - 300s
    // breakSession: 300,
};
export default Pomodoro;
