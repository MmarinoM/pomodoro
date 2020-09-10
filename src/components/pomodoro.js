import {Card, Button, ButtonGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";

const Pomodoro = (props) => {
    const [timer] = useState(props.workingSession);
    function displaytimer() {
        const seconds = timer % 60;
        const minutes = parseInt(timer / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }
    return (
        <div className={"w-100 d-flex flex-column align-items-center"}>
            <Card className={"bg-warning mb-3 w-50"}>
                <Card.Body>
                    <div className={"d-flex flex-column align-items-center"}>
                        <p className={"time"}>{displaytimer()}</p>
                        <ButtonGroup className={"w-50"}>
                            <Button className={"btn btn-info"}>{"+"}</Button>
                            <Button className={"btn btn-success"}>
                                {"START"}
                            </Button>
                            <Button className={"btn btn-danger"}>
                                {"RESET"}
                            </Button>
                            <Button className={"btn btn-info"}>{"-"}</Button>
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
