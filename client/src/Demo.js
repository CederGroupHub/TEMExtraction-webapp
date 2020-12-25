import React, { Component } from 'react'
import Spinner from './Spinner'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './App.css'
import Table from './Table'
import {Text} from 'rebass';


export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading_segmentation: false,
      uploading_detection: false,
      segmented_image: null,
      detected_image: null,
      uploaded_file: null,
      text: 'No File Selected.'
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setState({'loading': false});
  }

  fetchSegmentedImage(str) {
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
      this.setState({uploading_segmentation: false, segmented_image: res});
    });
  }

  fetchScaleDetectedImage(str) {
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
      this.setState({uploading_detection: false, detected_image: res});
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
      this.setState({uploading_detection: true});

      this.fetchSegmentedImage(String(e.target.result));
      this.fetchScaleDetectedImage(String(e.target.result));
    };
    reader.readAsDataURL(this.state.uploaded_file);
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
        case this.state.uploading_detection || this.state.uploading_segmentation:
          return (
            <div className='spin'>
              <Spinner />
            </div>
          )
        case this.state.detected_image !== null && this.state.segmented_image !== null:
          return (
            <Table segmented_image={this.state.segmented_image} detected_image={this.state.detected_image}/>
          )
        default:
          return (
            <div className='buttons'>
              <Buttons text={this.state.text} onChange={this.onChange} onClick={this.onClick}/>
            </div>
          )
      }
    }

    const intro = () => {
      return (
        <div>
          <Text color='black' fontWeight='bold' fontSize={[3, 4, 5]}>Demo</Text>
          <Text color='black' fontSize={[1, 2, 3]}>
            Upload a TEM image containing nanoparticles and click on the SUBMIT button to begin analysis.
            This version is capable of detecting and analysing nanorods, nanoparticles, nanotriangles and
            nanocubes. For best results, upload an image containing particles of these morphologies.
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
