import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';


export default class Home extends Component {
    render() {
        return (
            <div className='padding'>
                <Text color='black' fontWeight='bold' fontSize={[3, 4, 5]}>Home</Text>
            </div>
        );
    }
}