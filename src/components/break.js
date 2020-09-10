import {Card, Button, ButtonGroup} from "react-bootstrap";
import React, {useState} from "react";

const BreakTime = (props) => {
    const [timer, seTimer] = useState(props.breakSession);
    function displaytimer() {
        const seconds = timer % 60;
        const minutes = parseInt(timer / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    function resetTimer() {
        seTimer(props.breakSession);
    }
    return (
        <div className={"w-100 d-flex flex-column align-items-center"}>
            <Card className={"bg-success mb-3 w-50"}>
                <Card.Body>
                    <div className={"d-flex flex-column align-items-center"}>
                        <p className={"time"}>{displaytimer()}</p>
                        <ButtonGroup className={"w-50"}>
                            <Button
                                className={"btn btn-info"}
                                onClick={() => {
                                    seTimer(timer + 60);
                                }}>
                                {"+"}
                            </Button>
                            <Button className={"btn btn-success"}>
                                {"START"}
                            </Button>
                            <Button
                                className={"btn btn-danger"}
                                onClick={() => {
                                    resetTimer(timer + 60);
                                }}>
                                {"RESET"}
                            </Button>
                            <Button
                                className={"btn btn-info"}
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

BreakTime.defaultProps = {
    //in seconds = 5 min - 300s
    breakSession: 300,
};
export default BreakTime;
