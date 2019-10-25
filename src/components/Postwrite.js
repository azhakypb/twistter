import React, { Component, } from 'react';
import {Button} from 'react-bootstrap';
import Singlepost from './Singlepost.js'

class Postwrite extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => {
      return {
        show: !prevState.show
      }
    })
  }
  render() {
    let buttonText = this.state.show ? "Cancel" : "Write a Post"
    let buttonType = this.state.show ? "danger" : "success"
    return (
      <div>
      {this.state.show ? <Singlepost action={this.handleClick}/>: null}
       <Button variant={buttonType} size="md" onClick={this.handleClick} block> {buttonText} </Button>
      </div>
    )
  }
}

export default Postwrite;
