import React, { Component } from "react";
import { Router } from '@reach/router'
import Home from "./Home"
import Demo from "./Demo";
import nav from "./Navbar"

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='padding-navbar'>
                    {nav()}
                </div>
                <Router>
                    <Home path="/" />
                    <Demo path="/demo/" />
                </Router>
            </React.Fragment>
        );
    }
}