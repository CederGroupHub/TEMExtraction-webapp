import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Display from './DisplayImage';
import ColorKey from './Shared/img/color_key.png';

export default class Table extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="segmentation" id="uncontrolled-tab-example" style={{fontSize: [2, 3, 4]}}>
                <Tab tabClassName="color-blue" eventKey="segmentation" title="SEGMENTATION">
                    <div className='row'>
                        <div className='column'>
                            <Display image={this.props.segmented_image} />
                        </div>
                        <div className='column'>
                            <img src={ColorKey} alt='' />
                        </div>
                    </div>
                </Tab>
                <Tab tabClassName='color-blue' eventKey="scale_label" title="SCALE AND LABEL DETECTION">
                    <Display image={this.props.detected_image} />
                </Tab>
            </Tabs>
        );
    }
}
