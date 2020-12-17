import React, { Component } from 'react'
import Notifications from 'react-notify-toast'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import Footer from './Footer'
import { API_URL } from './config'
import './App.css'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}

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
    console.log(str);

    fetch(`${API_URL}/image-upload/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'base64': str}),
    });
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result}, () => {
          this.fetchImage(String(this.state.image));
        });
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
        <Footer />
      </div>
    )
  }  
}
