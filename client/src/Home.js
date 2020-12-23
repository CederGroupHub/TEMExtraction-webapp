import React, { Component } from 'react'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './App.css'
import Table from './Table'
import { Link } from '@reach/router'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading_segmentation: false,
      uploading_scale_detection: false,
      segmented_image: null,
      scale_detected_image: null
    }
    this.onChange = this.onChange.bind(this);
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
      this.setState({uploading_scale_detection: false, scale_detected_image: res});
    });
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({uploading_segmentation: true});
        // this.setState({uploading_scale_detection: true});

        this.fetchSegmentedImage(String(e.target.result));
        // this.fetchScaleDetectedImage(String(e.target.result));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    const content = () => {
      switch(true) {
        case this.state.loading:
          return <WakeUp />
        case this.state.uploading_segmentation:
          return <Spinner />
        case this.state.segmented_image !== null:
          return <Table segmented_image={this.state.segmented_image} />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      // <div className='container'>
      <div className='buttons'>
        {content()}
      </div>
      // </div>
    )
  }
}
