import React, { Component } from 'react'
import Images from './Images'
import WakeUp from './WakeUp'
import './App.css'

export default class Detection extends Component {
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
      <div>
        {content()}
      </div>
    )
  }
}
