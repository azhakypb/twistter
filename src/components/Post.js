// react modules
import React, { Component, } from 'react';
import { Badge, Button, Jumbotron } from 'react-bootstrap';
// aws modules
// custom modules
// globals

class Post extends Component {

	constructor(props){
		// props and states
		super(props)
		this.state = {

			'id'			: '',
			'username'		: '',
			'timestamp'		: '',
			'post_text'		: '',
			'quote_text' 	: '',
			'topics'		: []
		}

	}

	async componentDidMount(){

		if( !('id' in this.props) ){

			this.setState({'id':'1234'})
			this.setState({'username':'justin'})
			this.setState({'timestamp':'2019/10/10;4:40p'})
			this.setState({'post_text':'That 307 exam was really tough! I think i passed it though'})
			this.setState({'quote_text':''})
			this.setState({'topics':['school','programming','purdue']})

		} else {

			// TODO: load post from DB
		}
	}

	render(){

		const { id, username, timestamp, post_text, quote_text, topics } = this.state
		return(

			<Jumbotron>

				<Jumbotron>
					<p> afsdfasdfasfdasdfasdfa </p>
				</Jumbotron>

				<p> @{username} 	</p>
				<p> {timestamp} 	</p>
				<p> {post_text}		</p>

				{topics.map(topic => (
				<Badge key={topic}>{topic}</Badge>
				))}

				<Button variant="primary">
  					Like <Badge variant="light">9</Badge>
				</Button>

			</Jumbotron>
		)
	}
}

export default Post;