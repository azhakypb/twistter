//react modules
import React, { Component, } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather} from '@fortawesome/free-solid-svg-icons'

//components
import Singlepost from './Singlepost.js'
import './compCSS/Postwrite.css'

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
		let buttonText = this.state.show ? "Cancel" 			: " Write a Post"
		let buttonType = this.state.show ? "danger" 			: "success"
		return (
			<div>
				{this.state.show ? <Singlepost action={this.handleClick} username={this.props.username}/>: null}
				<Button className="write" variant={buttonType} size="md" onClick={this.handleClick} block>
				{this.state.show ? null : <FontAwesomeIcon icon={faFeather}/>}{buttonText} </Button>
			</div>
		)
	}
}

export default Postwrite;
