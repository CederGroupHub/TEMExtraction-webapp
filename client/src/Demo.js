import React, { Component } from 'react'
import Progress from './Spinner'
import Buttons from './Buttons'
import { Button } from '@material-ui/core';
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './App.css'
import Table from './Table'
import {Text} from 'rebass';
import { Logo } from './Navbar';
import { Link } from '@reach/router';


export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading_segmentation: false,
      uploading_detection: false,
      uploading_plot: false,
      segmented_image: null,
      detected_image: null,
      uploaded_file: null,
      plot: null,
      text: 'No File Selected.',
      progress: null,
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.setState({'loading': false});
  }

  fetchPlot(bar_width, digit, unit) {
    this.setState({progress: 'Plotting size distribution histograms...'});
    fetch(`${API_URL}/plot-size/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'bar_width': bar_width,
        'digit': digit,
        'unit': unit
      })
    })
    .then(res => {
      if (!res.ok) {
        console.log(res);
        throw res;
      }
      return res.json();
    })
    .then(res => {
      this.setState({uploading_plot: false, plot: res});
    });
  }

  fetchSegmentedImage(str) {
    this.setState({progress: 'Running particle segmentation...'});
    fetch(`${API_URL}/segment/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'base64': str}),
    })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(res => {
      this.setState({uploading_segmentation: false, segmented_image: res, uploading_detection: true});
      this.fetchScaleDetectedImage(str);
    });
  }

  fetchScaleDetectedImage(str) {
    this.setState({progress: 'Running Scale, Label and Bar detection...'});
    fetch(`${API_URL}/detect/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'base64': str}),
    })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(res => {
      this.setState({uploading_detection: false, detected_image: res, uploading_plot: true});
      this.fetchPlot(
        res.OCR.bar_width,
        res.OCR.digit,
        res.OCR.unit
      );
    });
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({text: e.target.files[0].name, uploaded_file: e.target.files[0]})
    }
  }

  onClick() {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({uploading_segmentation: true});

      this.fetchSegmentedImage(String(e.target.result));
    };
    reader.readAsDataURL(this.state.uploaded_file);
  }

  resetState() {
    this.setState({
      uploading_segmentation: false,
      uploading_detection: false,
      uploading_plot: false,
      segmented_image: null,
      detected_image: null,
      uploaded_file: null,
      plot: null,
      text: 'No File Selected.',
      progress: null
    });
  }

  render() {
    const content = () => {
      switch(true) {
        case this.state.loading:
          return (
            <div className='images'>
              <WakeUp />
            </div>
          )
        case (this.state.uploading_detection || this.state.uploading_segmentation || this.state.uploading_plot):
          return (
            // <div className='spin'>
              <Progress now={this.state.progress}/>
            // </div>
          )
        case this.state.detected_image !== null && this.state.segmented_image !== null && this.state.plot !== null:
          return (
            <React.Fragment>
              <Table segmented_image={this.state.segmented_image} detected_image={this.state.detected_image} plot={this.state.plot}/>
              <Link to='/demo/'>
                <Button variant="contained" color="secondary" component="span" onClick={this.resetState}>
                  Upload another image
                </Button>
              </Link>
            </React.Fragment>
          )
        default:
          return (
            // <div className='buttons'>
              <Buttons text={this.state.text} onChange={this.onChange} onClick={this.onClick}/>
            // </div>
          )
      }
    }

    const intro = () => {
      return (
        <div>
          <Text color='#26b7b7' fontWeight='bold' fontSize={[2, 3, 4]}>Demo</Text><br/>
          <Text color='white' fontSize={[1, 2, 3]}>
            This is a demo version of the {Logo('small')} software and is simply meant for illustrative purposes. The full <br/>
            version can be found on <a href='https://github.com/aksub99/tem-app'>GitHub</a>.<br/><br/>
            To try this demo out on your own TEM image, upload a TEM image containing nanoparticles and<br/>
            click on the Submit button to begin analysis.<br/><br/>
            This software is currently capable of detecting 4 shapes: rods, particles, triangular prisms and
            cubes.<br/>
            For best results, upload an image containing particles belonging to these shape categories.<br/><br/>
          </Text>
        </div>
      );
    }

    return (
      <div className='padding'>
        {intro()}<br/>
        {content()}
      </div>
    )
  }
}
