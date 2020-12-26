import React, { Component } from "react";
import { Router } from '@reach/router'
import About from "./About"
import Demo from "./Demo";
import nav from "./Navbar"

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                {nav()}<br/>
                <Router>
                    <About path="/" />
                    <Demo path="/demo/" />
                </Router>
            </React.Fragment>
        );
    }
}