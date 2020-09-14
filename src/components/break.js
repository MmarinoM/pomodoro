import {Button, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";

const Breaktime = props => {
    const [breakTime, setBreakTime] = useState(props.breakSession);
    const [isRunning, setRunningState] = useState(true);
    // BOOTSTRAP MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    //

    function displaybreak() {
        const seconds = breakTime % 60;
        const minutes = parseInt(breakTime / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    // *! décompte en seconde du BreakTime
    useEffect(() => {
        let interval;
        if (show === true) {
            if (isRunning) {
                interval = setInterval(() => {
                    setBreakTime(prevTimer => prevTimer - 1);
                }, 1000);
            }
        }
        return () => clearInterval(interval);
    }, [show, isRunning]);
    useEffect(() => {
        if (breakTime <= 0) {
            setRunningState(false);
            document.title = "End Of Break";
        } else {
            document.title = `BT - ${displaybreak()}`;
        }
    });
    // *! affichage du modal
    useEffect(() => {
        if (props.show === true) {
            setShow(props.show);
        }
    }, [props.show, setBreakTime]);

    return (
        <Modal
            show={show}
            onHide={() => {
                handleClose();
                setBreakTime(props.breakSession);
                setRunningState(!isRunning);
            }}>
            <Modal.Header className={"bg-success"} closeButton>
                <Modal.Title>{"BREAK TIME"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-success time"}>
                {displaybreak()}
            </Modal.Body>
            <Modal.Footer className={"bg-success"}>
                <Button
                    variant={"warning"}
                    disabled={breakTime <= 0}
                    onClick={() => {
                        setRunningState(!isRunning);
                    }}>
                    {isRunning ? "PAUSE" : "PLAY"}
                </Button>
                <Button
                    variant={"danger"}
                    onClick={() => {
                        handleClose();
                        setBreakTime(props.breakSession);
                        setRunningState(!isRunning);
                    }}>
                    {"Stop Working"}
                </Button>
                <Button
                    variant={"warning"}
                    onClick={() => {
                        handleClose();
                        setBreakTime(props.breakSession);
                        setRunningState(!isRunning);
                    }}>
                    {"Keep Working"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

Breaktime.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 5,

    //in seconds = 5 min - 300s
    breakSession: 5,
};
export default Breaktime;
