import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';
import { Logo } from './Navbar';
import DemoHome from './Shared/img/Demo_home.png';
import DemoScale from './Shared/img/demo_scale.png';
import DemoSegmentation from './Shared/img/demo_segmentation.png';
import DemoPSD from './Shared/img/demo_psd.png';


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
                <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>Usage Instructions</Text><br/>
                <Text color='white' fontSize={[1, 2, 3]}>
                    The Demo page of the app allows users to upload custom TEM images and perform subsequent shape and <br/>
                    size analysis. Users can click the BROWSE FILE button to upload a custom image and then hit the <br/>
                    SUBMIT button to proceed with analysis.<br/>
                </Text>
                <img src={DemoHome} alt='' /><br/>
                <Text color='white' fontSize={[1, 2, 3]}>
                    The app then processes the uploaded image and displays the results of analysis. The results are displayed <br/>
                    in two tabs - 1) Segmentation and 2) Scale and Label Detection.<br/> 
                    The Segmentation tab contains the predicted segmentation masks for the nanoparticles, which are coloured<br/>
                    according to their predicted shape. The key on the right side of the page gives the mapping between colours<br/>
                    and their corresponding shapes. Currently, the software is capable of detecting 4 shapes: rods, particles,<br/>
                    triangular prisms and cubes.<br/>
                </Text>
                <img src={DemoSegmentation} alt='' /><br/>
                <Text color='white' fontSize={[1, 2, 3]}>
                    The Scale and Label Detection tab contains the predicted locations of scales, labels and bars in the image.<br/>
                </Text>
                <img src={DemoScale} alt='' />
                <Text color='white' fontSize={[1, 2, 3]}>
                    The Particle Size Distribution tab contains the size distribution histograms for each shape present in the image.<br/>
                </Text>
                <img src={DemoPSD} alt='' />
            </div>
        );
    }
}