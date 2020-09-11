import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";

const Breaktime = props => {
    const [breakTime] = useState(props.breakSession);
    // BOOTSTRAP MODAL
    const [show, setShow] = useState(props.show);
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

    return (
        <Modal show={show} onHide={handleClose}>
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
        </Modal>
    );
};

Breaktime.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 5,

    //in seconds = 5 min - 300s
    breakSession: 300,
};
export default Breaktime;
