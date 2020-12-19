import React, { Component } from 'react'
import Notifications from 'react-notify-toast'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading: false,
      image: null
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({'loading': false});
  }

  fetchImage(str) {
    this.setState({uploading: true});

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
      this.setState({uploading: false, image: res});
    });
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.fetchImage(String(e.target.result));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    const content = () => {
      switch(true) {
        case this.state.loading:
          return <WakeUp />
        case this.state.uploading:
          return <Spinner />
        case this.state.image !== null:
          return <Images 
                  image={this.state.image}
                  />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div className='container'>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }  
}
