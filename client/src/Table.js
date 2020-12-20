import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("In Table component");
        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Contact
                </Tab>
            </Tabs>
        );
    }
}
