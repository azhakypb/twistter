// react modules
import React, { Component, } from 'react';
import { Alert, Badge, Button, Row, Jumbotron, Toast } from 'react-bootstrap';
// aws modules
// custom modules
// globals

class Post extends Component {

	constructor(props){
		// props and states
		super(props)
		console.log(this.props.id)
		this.state = {

			'id'			: '',
			'isQuote'       : false,
			'q_id' 			: '',
			'username'		: '',
			'q_username'	: '',
			'url'			: '',
			'q_url' 		: '',
			'timestamp'		: '',
			'q_timestamp'	: '',
			'text'			: '',
			'q_text'		: '',
			'topics'		: [],
			'q_topics' 		: []
		}

	}

	async componentDidMount(){

		if( !('id' in this.props) ){

			this.setState({'id':'1234'})
			this.setState({'isQuote':true})
			this.setState({'username':'Poster Username'})
			this.setState({'q_username':'Quoted Username'})
			this.setState({'url':'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg'})
			this.setState({'q_url':'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg'})
			this.setState({'timestamp':'Post Timestamp'})
			this.setState({'q_timestamp':'Quoted Timestamp'})
			this.setState({'text':'Post Text'})
			this.setState({'q_text':'Quoted Text'})
			this.setState({'topics':['Topic 1','Topic 2','Topic 3']})
			this.setState({'q_topics':['Topic 1','Topic 2','Topic 3']})

		} else {

		}

	}

	render(){

		const { id, isQuote, username, url, timestamp, text, topics } = this.state;
		if( !isQuote ){

			return(

				<Toast>
	  				<Toast.Header>
	    				<strong className="mr-auto">@{username}</strong>
	    				<small>{timestamp}</small>
					</Toast.Header>
					<Toast.Body style={{ paddingLeft: 30, paddingRight: 0 }}>
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

			const{ q_id, q_username, q_url, q_timestamp, q_text, q_topics } = this.state;

			return(

				<Toast>
	  				<Toast.Header>
	    					<strong 
	    						onClick={(e) => document.location.href = "/otherprofile/"+{username} } 
	    						className="mr-auto">
	    						@{username}
	    					</strong>
	    				<small>{timestamp}</small>
					</Toast.Header>

					<div style={{ paddingLeft: 5, paddingRight: 5 }}>
					<Toast>
						<Toast.Header>
	    					<strong 
	    						onClick={(e) => document.location.href = "/otherprofile/"+{q_username} }
	    						className="mr-auto">
	    						@{q_username}
	    					</strong>
	    					<small>{q_timestamp}</small>
						</Toast.Header>
						<Toast.Body style={{ paddingLeft: 30, paddingRight: 0 }}>
							<Row style={{ paddingBottom: 5}} >
								{q_text}
							</Row>
							<Row>
								{q_topics.map(topic => (
									<Badge variant="primary" key={topic}>{topic}</Badge>
								))}
							</Row>
						</Toast.Body>
					</Toast>
					</div>

					<Toast.Body style={{ paddingLeft: 30, paddingRight: 0 }}>
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