import React, { Component } from 'react'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './App.css'

export default class Segmentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({'loading': false});
  }

  render() {
    const content = () => {
      switch(true) {
        case this.state.loading:
          return <WakeUp />
        default:
          return <Images image={this.props.image} />
      }
    }

    return (
      <div className='container'>
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}
