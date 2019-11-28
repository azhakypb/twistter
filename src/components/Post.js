// react modules
import React, { Component } from 'react';
import { Badge, Button, Row, Toast, Modal, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, faQuoteLeft, faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'
// aws modules
import { Auth } from 'aws-amplify';
// custom modules
import { searchPost, createLike, deleteLike, deletePost, getEngagement, createEngagement, updateEngagement, getFollowedTopics, updateNewTopics, updateFollowedTopics } from '../DBOps.js';
import Quoteprocess from  './Quoteprocess'
import Editprocess from  './Editprocess'
// globals

function TopicList(props){
	const topics = props.topics;
	const new_topics = props.new_topics;
	console.log(topics,new_topics);
	const items = topics.map((topic)=>
		<Badge pill variant="primary" key={topic}>#{topic}</Badge>
	);

	const items2 = new_topics.map((topic)=>
		<Badge pill variant="danger" key={topic}>#{topic}</Badge>
	);
	return <div>{items}{items2}</div>;
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

		Auth.currentAuthenticatedUser({ bypassCache: true})
			.catch((err)=>{
				console.log('Error getting user', err);
			})
			.then((user)=>{

				this.setState({
					curUser:	user.username
				});

				searchPost(this.state.id)
					.then((res) => {

						res 		= res.data.getPost;
						res.author 	= res.author.id

						getFollowedTopics(user.username,res.author)
							.then((tres)=>{

								console.log(tres);
								var allPostTopics = res.topics.items.map((topic)=>topic.topic.id);
								var postTopics = [];
								var newTopics = [];
								if(tres.data.getFollow !== null){
									if(tres.data.getFollow.newtopics !== null){
										var followNewTopics = tres.data.getFollow.newtopics.split(',');
									} else {
										var followNewTopics = [];
									}

									if(tres.data.getFollow.followedtopics !== null){
										var followFollowedTopics = tres.data.getFollow.followedtopics.split(',');
									} else {
										var followNewTopics = [];
									}
								} else {
									var followNewTopics = null;
									var followFollowedTopics = null;
								}

								if(followNewTopics !== null){
									for(const topic of allPostTopics){

										if(followNewTopics.includes(topic)){

											newTopics.push(topic);
											followFollowedTopics.push(topic);
											followNewTopics.splice(followNewTopics.indexOf(topic),1);
										} else {

											postTopics.push(topic);
										}
									}
								}else{
									postTopics = allPostTopics;
								}

								if(followFollowedTopics !== null){
									updateFollowedTopics(user.username,res.author,(followFollowedTopics.length > 0) ? followFollowedTopics.join(',') : null);
								}

								if(followNewTopics !== null){
									updateNewTopics(user.username,res.author,(followNewTopics.length > 0) ? followNewTopics.join(',') : null);
								}

								this.setState({
									username: 		res.author,
									timestamp: 		res.timestamp,
									text: 			res.text,
									topics: 		postTopics,
									new_topics: 	newTopics,
									likes: 			res.likes.items
								});

								if(res.quote != null){
									this.setState({
										q_username: res.quote.author.id,
										q_text: res.quote.text,
										q_timestamp: res.quote.timestamp
									});
								}
							});
					})
					.catch((err)=>{
						console.log('pull error',err);
					});

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
			'new_topics'	: [],
			'likes'			: [],
			showQuote		: false,
			showEdit		: false,
			enableEdit		: false,
			curUser 		: '',
			liked			: false
		}
		if( 'id' in this.props && !(this.props.id === '') ){
			this.state.id = this.props.id;
		}

		this.pull 	   				= this.pull.bind(this);
		this.stub 	   				= this.stub.bind(this);
		this.handleQuoteClick 		= this.handleQuoteClick.bind(this);
		this.handleEditClick 		= this.handleEditClick.bind(this);
		this.handleDeleteClick 			= this.handleDeleteClick.bind(this);
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
				console.log('Error deleting post', err);
			})
			.then((res)=>{
				console.log('Deleting post', res);
				window.location.reload();
			});

	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if( this.state.id !== prevState.id ){ this.pull(); }
	}

	createLike = async () => {

		var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
		var userid = user.username;
		console.log('Userid:', userid);
		var postid = this.props.id;
		try {
			var ret = await createLike(userid, postid);
			for (var i = 0; i < this.state.topics.length; i++) {
				var engagement = await getEngagement({id: userid + "-" + this.state.topics[i]});
				if (engagement.data.getEngagement == null) {
					console.log(JSON.stringify({id: userid + "-" + this.state.topics[i], value: 1, topicid: this.state.topics[i], userid: userid}));
					console.log(await createEngagement({id: userid + "-" + this.state.topics[i], value: 1, topicid: this.state.topics[i], userid: userid}));
				}
				else {
					console.log(JSON.stringify({id: engagement.data.getEngagement.id, value: engagement.data.getEngagement.value + 1}));
					console.log(await updateEngagement({id: engagement.data.getEngagement.id, value: engagement.data.getEngagement.value + 1}));
				}
			}
		} catch(e) {
			console.log(e);
			var ret = await deleteLike(userid,postid);
			for (var i = 0; i < this.state.topics.length; i++) {
				var engagement = await getEngagement({id: userid + "-" + this.state.topics[i]});
				console.log(await updateEngagement({id: engagement.data.getEngagement.id, value: engagement.data.getEngagement.value - 1}));
			}
		}
		console.log(ret);
		this.pull();
	}

	render(){
		//console.log(this.state);
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
			new_topics
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
								<TopicList topics={topics} new_topics={new_topics}/>
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
					{this.state.showEdit ? <Editprocess action={this.handleEditClick} text={this.state.text} topics={this.state.topics} showEdit={this.state.showEdit} id={this.props.id}/> : null}
				</div>
			)
	}
}

export default Post;
