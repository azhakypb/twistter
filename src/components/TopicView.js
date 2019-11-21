
import { ListGroup } from 'react-bootstrap';
import React, { Component } from 'react';

class TopicView extends Component {

	constructor(props){

		super(props);

		console.log('topic view','constructor','creating topic view');

		this.state = {
			'followed': [ 'Dogs', 'Music', 'Science', 'Politics' ],
			'ignored': [ 'Cats', 'Bikes', 'Country Music', 'Minecraft' ],
			'new': []
		}

		this.followedToIgnored = this.followedToIgnored.bind(this);
		this.ignoredToFollowed = this.ignoredToFollowed.bind(this);
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