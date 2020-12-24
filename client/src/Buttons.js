import React from 'react'
import './App.css';
import { Button } from '@material-ui/core';

export default props => 
  <div>
    <input accept="image/*" id="file-upload" type="file" onChange={props.onChange}/>
    <label htmlFor="file-upload">
      <Button variant="contained" color="primary" component="span">
        Browse file...
      </Button>{" "}
      {props.text}
    </label>
  </div>
