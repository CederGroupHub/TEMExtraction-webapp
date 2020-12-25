import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';


export default class Home extends Component {
    render() {
        return (
            <div className='padding'>
                <Text color='black' fontWeight='bold' fontSize={[2, 3, 4]}>Home</Text>
            </div>
        );
    }
}