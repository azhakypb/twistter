
import { ListGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import { getFollowedTopics, updateFollowedTopics } from '../DBOps.js'

class TopicView extends Component {

	constructor(props){

		super(props);

		console.log('topic view','constructor','creating topic view');

		this.state = {
			'follower': this.props.follower,
			'followee': this.props.followee,
			'followed': [],
			'ignored': [],
			'new': []
		}

		this.followedToIgnored = this.followedToIgnored.bind(this);
		this.ignoredToFollowed = this.ignoredToFollowed.bind(this);

		console.log(this.state);
	}

	async componentDidMount(){

		var followed = await getFollowedTopics(this.state.follower,this.state.followee);
		console.log(followed);
	}

	followedToIgnored(index){

		var followed = this.state.followed;
		var ignored = this.state.ignored;

		ignored.push( followed[index] );
		followed.splice( index, 1 );

		this.setState({ 
			followed: followed,
			ignored: ignored
		});
	}

	ignoredToFollowed(index){

		var followed = this.state.followed;
		var ignored = this.state.ignored;

		followed.push( ignored[index] );
		ignored.splice( index, 1 );

		this.setState({
			followed: followed,
			ignored: ignored
		});
	}

	render(){

		const{ followed, ignored } = this.state;

		return(
			<div>
				<h2>Followed Topics</h2>

				<ListGroup>
					{followed.map( (topic, index) =>
						<ListGroup.Item key={index} onClick={()=>this.followedToIgnored(index)}>
							{topic}
						</ListGroup.Item>
					)}
				</ListGroup>

				<h2>Ignored Topics</h2>

				<ListGroup>
					{ignored.map( (topic, index) => 
						<ListGroup.Item key={index} onClick={()=>this.ignoredToFollowed(index)}>
							{topic}
						</ListGroup.Item>
					)}
				</ListGroup>
			</div>
		)
	}

}

export default TopicView;