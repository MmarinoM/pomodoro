// eslint-disable-next-line unicorn/filename-case
import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col} from "react-bootstrap";
import Pomodoro from "./components/pomodoro";

class App extends React.Component {
    render() {
        const {name} = this.props;
        return (
            <>
                <Container fluid>
                    <Row className={"h-100"}>
                        <Col>
                            <Pomodoro />
                            {name}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;
