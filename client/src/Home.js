import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';
import { Logo } from './Navbar';


export default class Home extends Component {
    render() {
        return (
            <div className='padding'>
                <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>HOME</Text><br/>
                <Text color='white' fontSize={[1, 2, 3]}>
                    {Logo('small')} is a software for automated analysis of TEM images of nanoparticles.<br/>
                    It is powered by Deep Learning based Segmentation and Object Detection algorithms.<br/><br/>
                    Two major steps are taken for information retrieval from an image:<br/><br/>
                    <ol>
                        <li>Segment particles and identify their shapes</li>
                        <li>Detect and read scales and labels</li>
                    </ol>
                    This information can subsequently be utilized to obtain information about particle size and shape<br/>
                    distributions etc.
                </Text>
            </div>
        );
    }
}