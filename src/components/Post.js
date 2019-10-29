// react modules
import React, { Component, } from 'react';
import { Alert, Badge, Button, Row, Jumbotron, Toast } from 'react-bootstrap';
import ReactDOM from 'react-dom';
// aws modules
// custom modules
import DBOps from '../DBOps.js';
// globals

class Post extends Component {

	stub() {
		this.setState({
			'username'		: 'Poster Username',
			'q_username'	: 'Quote Username',
			'timestamp'		: 'Post Timestamp',
			'q_timestamp' 	: 'Quote Timestamp',
			'text' 			: 'Post Text Post Text Post Text Post Text Post Text Post Text',
			'q_text'		: 'Quote Text Quote Text Quote Text Quote Text Quote Text',
			'topics' 		: [ 'Topic 1', 'Topic 2', 'Topic 3']
		});
	}

	async pull(){

		var db = new DBOps();
		var info = JSON.stringify({id: this.state.id});
		console.log(info);
		var databaseRequest = await db.searchPost(info).catch((err)=>{console.log(err)});

		console.log(databaseRequest);

		this.setState(this.baseState, () => {
			this.setState({
				'username'	: databaseRequest.author.id,
				'timestamp'	: databaseRequest.timestamp,
				'text'		: databaseRequest.text
				}, () => {
					console.log(this.state);
			});
		});

	}

	constructor(props){
		// props and states
		super(props)
		this.state = {
			'username'		: '',
			'q_username'	: '',
			'timestamp'		: '',
			'q_timestamp'	: '',
			'text'			: '',
			'q_text'		: '',
			'topics'		: []
		}
		this.baseState = this.state;

		if( 'id' in this.props ){
			this.setState({id:this.props.id});
		} else {
			this.setState({id:''});
		}

		this.pull = this.pull.bind(this);
		this.stub = this.stub.bind(this);
	}

	async componentDidMount(){
		this.stub();
	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if( this.props.id == '' ){ return 0; }

		if( this.state.id != this.props.id ){
			console.log('difference in state and prop',this.state.id,this.props.id);
			this.setState({id:this.props.id}, () =>{
				this.setState(this.baseState,
					this.pull);
			});
		}
	}

	render(){

		const {	
			username,
			q_username, 
			timestamp, 
			q_timestamp,
			text,
			q_text,
			topics,
		} = this.state;

		if( q_username == '' ){

			return(

				<Toast>
	  				<Toast.Header>
	    				<strong 
	    				onClick={(e) => {
	    					document.location.href = "/otherprofile/"+username;
	    				}}
	    				className="mr-auto">@{username}</strong>
	    				<small>{timestamp}</small>
					</Toast.Header>
					<Toast.Body style={{ paddingLeft: 30, paddingRight: 30 }}>
						<Row style={{ paddingBottom: 5}}>
							{text}
						</Row>
						<Row>
							{topics.map(topic => (
								<Badge variant="primary" key={topic}>{topic}</Badge>
							))}
						</Row>
						<Row>
							<Button variant="primary">
  								Like <Badge variant="light">9</Badge>
							</Button>
						</Row>
					</Toast.Body>
				</Toast>

			)

		} else {

			return(

				<Toast>
	  				<Toast.Header>
	    					<strong 
	    						onClick={(e) => document.location.href = "/otherprofile/"+username } 
	    						className="mr-auto">
	    						@{username}
	    					</strong>
	    				<small>{timestamp}</small>
					</Toast.Header>

					<div style={{ paddingLeft: 5, paddingRight: 5 }}>
					<Toast>
						<Toast.Header>
	    					<strong 
	    						onClick={(e) => document.location.href = "/otherprofile/"+q_username }
	    						className="mr-auto">
	    						@{q_username}
	    					</strong>
	    					<small>{q_timestamp}</small>
						</Toast.Header>
						<Toast.Body style={{ paddingLeft: 30, paddingRight: 30 }}>
							<Row style={{ paddingBottom: 5}} >
								{q_text}
							</Row>
						</Toast.Body>
					</Toast>
					</div>

					<Toast.Body style={{ paddingLeft: 30, paddingRight: 30 }}>
						<Row style={{ paddingBottom: 5}}>
							{text}
						</Row>
						<Row style={{ paddingBottom: 5}}>
							{topics.map(topic => (
								<Badge variant="primary" key={topic}>{topic}</Badge>
							))}
						</Row>
						<Row>
							<Button size="sm"variant="primary">
  								Like <Badge variant="light">9</Badge>
							</Button>
						</Row>
					</Toast.Body>
				</Toast>

			)

		}
	}
}

export default Post;