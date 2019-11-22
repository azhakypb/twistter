// react modules
import React, { Component } from 'react';
import { Badge, Button, Row, Toast, Modal, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faQuoteLeft, faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'
// aws modules
import { Auth } from 'aws-amplify';
// custom modules
import { searchPost, createLike, deleteLike, deletePost } from '../DBOps.js';
import Quoteprocess from  './Quoteprocess'
import Editprocess from  './Editprocess'
// globals

function TopicList(props){
	const topics = props.topics;
	const items = topics.map((topic)=>
		<Badge pill variant="link" key={topic}>#{topic}</Badge>
	);
	return <div>{items}</div>;
}

class Post extends Component {


	stub() {
		this.setState({
			'username'		: 'Poster Username',
			'q_username'	: 'Quote Username',
			'timestamp'		: 'Post Timestamp',
			'q_timestamp' 	: 'Quote Timestamp',
			'text' 				: 'Post Text Post Text Post Text Post Text Post Text Post Text',
			'q_text'			: 'Quote Text Quote Text Quote Text Quote Text Quote Text',
			'topics' 			: [ 'Topic 1', 'Topic 2', 'Topic 3']
		});
	}

	async pull(){

		searchPost(this.state.id).then((res) => {

			console.log(res);
			res 		= res.data.getPost;
			res.author 	= res.author.id

			this.setState({
				username: 		res.author,
				timestamp: 		res.timestamp,
				text: 			res.text,
				topics: 		res.topics.items.map((topic)=>topic.topic.id),
				likes: 			res.likes.items
			});

			if(res.quote != null){
				this.setState({
					q_username: res.quote.author.id,
					q_text: res.quote.text,
					q_timestamp: res.quote.timestamp
				});
			}


		}).catch((err)=>{

			console.log('pull error',err);

		});

	}

	constructor(props){
		// props and states
		super(props);
		this.state = {
			'id'			: '',
			'username'		: '',
			'q_username'	: '',
			'timestamp'		: '',
			'q_timestamp'	: '',
			'text'			: '',
			'q_text'		: '',
			'topics'		: [],
			'likes'			: [],
			showQuote		: false,
			showEdit		: false,
			enableEdit		: false,
			curUser 		: ''
		}
		if( 'id' in this.props && !(this.props.id === '') ){
			this.state.id = this.props.id;
		}

		this.pull 	   				= this.pull.bind(this);
		this.stub 	   				= this.stub.bind(this);
		this.handleQuoteClick 		= this.handleQuoteClick.bind(this);
		this.handleEditClick 		= this.handleEditClick.bind(this);
		this.handleDeleteClick		= this.handleDeleteClick.bind(this);
	}
	async getUser() {
		var user = await Auth.currentAuthenticatedUser({ bypassCache: true});
		this.setState({
			curUser:	user.username
		});
	}
	handleQuoteClick() {
		this.setState(prevState => {
			return {
				showQuote: !prevState.showQuote
			}
		});
	}
	handleEditClick() {
		this.setState(prevState => {
			return {
				showEdit: !prevState.showEdit
			}
		});
	}
		async componentDidMount(){

		if( this.state.id !== '' ){ this.pull(); }
	}
	handleDeleteClick() {

		deletePost(this.props.id)
			.catch((err)=>{
				console.log(err);
			})
			.then((res)=>{
				console.log(res);
				window.location.reload();
			});

	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if( this.state.id !== prevState.id ){ this.pull(); }
	}

	createLike = async () => {

		var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
		var userid = user.username;
		var postid = this.props.id;
		try {
			var ret = await createLike(userid,postid);
		} catch(e) {
			console.log(e);
			var ret = await deleteLike(userid,postid);
		}
		console.log(ret);
		this.pull();
	}

	render(){
		if(this.state.curUser === ''){
			this.getUser();
		}
		console.log(this.state);
		let editDeleteAllow;
		if(this.state.curUser === this.state.username) {
			editDeleteAllow = true;
		} else {
			editDeleteAllow = false;
		}
		const {
			username,
			q_username,
			timestamp,
			q_timestamp,
			text,
			q_text,
			topics,
		} = this.state;

			return(
				<div>
					<Toast>
		  				<Toast.Header closeButton={false}>
		    				<strong
		    					onClick={(e) => {
		    						document.location.href = "/otherprofile/"+username;
		    					}}
		    					className="mr-auto">@{username}
							</strong>
		    				<small>{timestamp}</small>
						</Toast.Header>

						{ (q_username === '' ) ? null :

						 	<div style={{ paddingLeft: 5, paddingRight: 5 }}>
								<Toast>
									<Toast.Header closeButton={false}>
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
							</div> }

						<Toast.Body style={{ paddingLeft: 30, paddingRight: 30 }}>
							<Row style={{ paddingBottom: 5}}>
								{text}
							</Row>
							<Row>
								<TopicList topics={topics}/>
							</Row>
							<Row>
								<Button variant="outline-danger" size="sm" onClick={this.createLike}><FontAwesomeIcon icon={faHeart}/>
	  							<Badge variant="light">{this.state.likes.length}</Badge>
								</Button>
								<Button variant="outline-info" size="sm" onClick={this.handleQuoteClick}><FontAwesomeIcon icon={faQuoteLeft} /><FontAwesomeIcon icon={faQuoteRight}/>
								</Button>
								{editDeleteAllow ?
									<Button
										variant="outline-warning"
										size="sm"
										onClick={this.handleEditClick}
										action={this.handleDeleteClick}>
										<FontAwesomeIcon icon={faEdit}/>
									</Button>
									: null}
								{editDeleteAllow ?
									<Button
										variant="outline-danger"
										size="sm"
										onClick={this.handleDeleteClick}
										style={{ marginLeft: 159}}>
										<FontAwesomeIcon icon={faTrash}/>
									</Button>
									: null}
							</Row>
						</Toast.Body>
					</Toast>
					{this.state.showQuote ? <Quoteprocess quoteClick={this.handleQuoteClick} usernameq={this.state.username} text={this.state.text} topics={this.state.topics} showQuote={this.state.showQuote} id={this.props.id}/> : null}
					{this.state.showEdit ? <Editprocess action={this.handleEditClick} text={this.state.text} topics={this.state.topics} showEdit={this.state.showEdit}/> : null}
				</div>
			)
	}
}

export default Post;
