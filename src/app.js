// eslint-disable-next-line unicorn/filename-case
import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
    render() {
        const {name} = this.props;
        return (
            <>
                <h1 className={"text-warning"}>{name}</h1>
            </>
        );
    }
}

export default App;
