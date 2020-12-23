import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Display from './DisplayImage';

export default class Table extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="segmentation" id="uncontrolled-tab-example">
                <Tab eventKey="segmentation" title="Segmentation">
                    <Display image={this.props.segmented_image} />
                </Tab>
                <Tab eventKey="scale_label" title="Scale and Label detection">
                    <Display image={this.props.detected_image} />
                </Tab>
            </Tabs>
        );
    }
}
