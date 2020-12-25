import React, { Component } from "react";
import './App.css';
import {Text} from 'rebass';


export default class Home extends Component {
    render() {
        return (
            <div className='padding'>
                <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>HOME</Text>
            </div>
        );
    }
}