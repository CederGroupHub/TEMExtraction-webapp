import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';
import { Logo } from './Navbar';


export default class About extends Component {
    render() {
        return (
            <div className='padding'>
                <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>About</Text><br/>
                <Text color='white' fontSize={[1, 2, 3]}>
                    {Logo('small')} is a software for automated analysis of TEM images of nanoparticles.<br/>
                    It is powered by Deep Learning based Segmentation and Object Detection algorithms.<br/><br/>
                    Two major steps are taken for information retrieval from an image:<br/><br/>
                    <ol>
                        <li>Particles are segmented and shapes are identified</li>
                        <li>Scales and labels are located and read</li>
                    </ol>
                    This information can subsequently be utilized to perform analysis such as particle size and shape<br/>
                    distributions.
                </Text><br/><br/>
                <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>Sample Results</Text><br/>
                {/* <Text color='white' fontSize={[1, 2, 3]}> */}
            </div>
        );
    }
}