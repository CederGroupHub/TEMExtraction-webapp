import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Display from './DisplayImage';
import ColorKey from './Shared/img/color_key.png';
import { Text } from 'rebass';

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
                    <div className='row'>
                        <div className='column'>
                            <Display image={this.props.detected_image} />
                        </div>
                        <div className='column'>
                            <Text color='white' fontSize={[1, 2, 3]}>
                                Label: {this.props.detected_image.OCR.label}<br/>
                                Scale: {this.props.detected_image.OCR.digit}{this.props.detected_image.OCR.unit}<br/>
                                Bar Width: {this.props.detected_image.OCR.bar_width}
                            </Text>
                        </div>
                    </div>
                </Tab>
                <Tab tabClassName='color-blue' eventKey="psd_plot" title="PARTICLE SIZE DISTRIBUTION">
                    <Display image={this.props.plot} />
                </Tab>
            </Tabs>
        );
    }
}
