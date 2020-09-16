// eslint-disable-next-line unicorn/filename-case
import React from "react";
import "bootstrap";
import "bootswatch/dist/darkly/bootstrap.min.css";
import {Container, Row, Col} from "react-bootstrap";
import Pomodoro from "./components/pomodoro";

const App = () => (
    <>
        <Container fluid>
            <Row className={"h-100"}>
                <Col>
                    <Pomodoro />
                </Col>
            </Row>
        </Container>
    </>
);
export default App;
