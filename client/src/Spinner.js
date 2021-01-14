import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Progress(props) {
  var label = props.now;
  var now;
  if (label === null) {
    now = 0;
  }
  else if (label === 'Running particle segmentation...') {
    now = 33;
  }
  else if (label === 'Running Scale, Label and Bar detection...') {
    now = 66;
  }
  else if (label === 'Plotting size distribution histograms...') {
    now = 99;
  }
  const progressInstance = <ProgressBar animated now={now} label={`${label}`} />;
  return (
    <div>
      {progressInstance}
    </div>
  );
}