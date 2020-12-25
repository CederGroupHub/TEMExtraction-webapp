import React from 'react'
import './App.css';
import { Button } from '@material-ui/core';
import {Text} from 'rebass'

export default props => 
  <div>
    <div>
      <input accept="image/*" id="file-upload" type="file" onChange={props.onChange}/>
      <label htmlFor="file-upload">
        <Button size='small' variant="outlined" color="primary" component="span">
          Browse File...
        </Button>{" "}
        <Text style={{display: 'inline'}} color='black' fontSize={[1, 1, 1]}>{props.text}</Text>
      </label>
    </div>
    <Button size='small' variant='contained' color='primary' onClick={props.onClick}>
      Submit
    </Button>
  </div>
