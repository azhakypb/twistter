// react modules
import React, { Component } from 'react';
import { Badge, Button, Row, Toast } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// custom modules
import { searchPost, createLike, createEngagement, updateEngagement, getEngagement } from '../DBOps.js';
// globals

function TopicList(props){
	const topics = props.topics;
	const items = topics.map((topic)=>
		<Badge variant="primary" key={topic}>{topic}</Badge>
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
			'text' 			: 'Post Text Post Text Post Text Post Text Post Text Post Text',
			'q_text'		: 'Quote Text Quote Text Quote Text Quote Text Quote Text',
			'topics' 		: [ 'Topic 1', 'Topic 2', 'Topic 3']
		});
	}

	async pull(){

		var info = JSON.stringify({id: this.state.id});

		searchPost(info).then((res) => {

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
			'likes'			: []
		}

		if( 'id' in this.props && !(this.props.id === '') ){
			this.state.id = this.props.id;
		}

		this.engage = {
			userid: "",
			topic: ""
		}

		this.pull = this.pull.bind(this);
		this.stub = this.stub.bind(this);
	}

	async componentDidMount(){

		if( this.state.id !== '' ){ this.pull(); }
	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if( this.state.id !== prevState.id ){ this.pull(); }
	}

	createLike = async () => {
		var userid = await Auth.currentAuthenticatedUser({ bypassCache: true });
		console.log(userid.username);
		var postid = this.props.id;
		var likeid = userid.username + postid;
		var ret = await createLike(JSON.stringify({id: likeid, user: userid.username, post: postid}));
		// loop to update engagement between user and his/her topics
		for (var i = 0; i < this.state.topics.length; i++) {
			this.engage.topic = this.state.topics[i];
			this.engage.userid = userid.username;
			var engagement = await getEngagement({id: userid.username + "-" + this.state.topics[i]});
			if (engagement.data.getEngagement == null) { // creates engagement if user never engaged with that specific topic
				console.log("Created Engagement: " + JSON.stringify(createEngagement({id: this.engage.userid + "-" + this.engage.topic,
																																							value: 1, topicid: this.engage.topic,
																																							userid: this.engage.userid})));
			}
			else { // user has engaged with topic before
				updateEngagement({id: engagement.data.getEngagement.id, value: engagement.data.getEngagement.value + 1});
				console.log("Updated Engagment: " + JSON.stringify(engagement));
			}
		}
		console.log(ret);
	}

	render(){

		const {
			username,
			q_username,
			timestamp,
			q_timestamp,
			text,
			q_text,
			topics
		} = this.state;

		if( q_username === '' ){

			return(

				<Toast>
	  				<Toast.Header>
	    				<strong
	    					onClick={(e) => {
	    						document.location.href = "/otherprofile/"+username;
	    					}}
	    					className="mr-auto">@{username}
						</strong>
	    				<small>{timestamp}</small>
					</Toast.Header>
					<Toast.Body style={{ paddingLeft: 30, paddingRight: 30 }}>
						<Row style={{ paddingBottom: 5}}>
							{text}
						</Row>
						<Row>
							<TopicList topics={topics}/>
						</Row>
						<Row>
							<Button variant="primary" onClick={this.createLike}>
  								Like <Badge variant="light">{this.state.likes.length}</Badge>
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
							<TopicList topics={topics}/>
						</Row>
						<Row>
							<Button size="sm"variant="primary" onClick={this.createLike}>
  								Like <Badge variant="light">{this.state.likes.length}</Badge>
							</Button>
						</Row>
					</Toast.Body>

				</Toast>
			)
		}
	}
}

export default Post;
