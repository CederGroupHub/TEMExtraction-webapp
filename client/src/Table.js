import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Segmentation from './Segmentation'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Table extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="segmentation" id="uncontrolled-tab-example">
                <Tab eventKey="segmentation" title="Segmentation">
                    <Segmentation image={this.props.segmented_image} />
                </Tab>
                <Tab eventKey="scale_label" title="Scale and Label detection">
                    Add Scale and Label detection here!
                </Tab>
            </Tabs>
        );
    }
}
