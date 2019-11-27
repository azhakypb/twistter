
import { ListGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import { getFollowedTopics, updateFollowedTopics, updateUnfollowedTopics, updateNewTopics } from '../DBOps.js'

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

		getFollowedTopics(this.state.follower,this.state.followee)
			.catch((err)=>{
				console.log(err);
			})
			.then((res)=>{
				console.log(res);
				if(res.data.getFollow != null){
					if(res.data.getFollow.followedtopics != null){
						this.setState({followed: res.data.getFollow.followedtopics.split(',')},()=>console.log(this.state));
					}
					if(res.data.getFollow.unfollowedtopics != null){
						this.setState({ignored:res.data.getFollow.unfollowedtopics.split(',')},()=>console.log(this.state));
					}
					if(res.data.getFollow.newtopics != null){
						this.setState({new:res.data.getFollow.newtopics.split(',')},()=>console.log(this.state));
					}
				}
			});
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

	async componentWillUnmount(){

		if(this.state.followed.length > 0){
			updateFollowedTopics(this.state.follower,this.state.followee,this.state.followed.join(','))
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
			updateUnfollowedTopics(this.state.follower,this.state.followee,(this.state.ignored.length > 0) ? this.state.ignored.join(',') : null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		} else {
			updateFollowedTopics(this.state.follower,this.state.followee,null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
			updateUnfollowedTopics(this.state.follower,this.state.followee,(this.state.ignored.length > 0) ? this.state.ignored.join(',') : null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		}

		if(this.state.ignored.length > 0){
			updateFollowedTopics(this.state.follower,this.state.followee,(this.state.followed.length > 0) ? this.state.followed.join(',') : null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
			updateUnfollowedTopics(this.state.follower,this.state.followee,this.state.ignored.join(','))
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		} else {
			updateUnfollowedTopics(this.state.follower,this.state.followee,null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
			updateFollowedTopics(this.state.follower,this.state.followee,(this.state.followed.length > 0) ? this.state.followed.join(',') : null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		}

		if(this.state.new.length > 0){
			updateNewTopics(this.state.follower,this.state.followee,this.state.new.join(','))
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		} else {
			updateNewTopics(this.state.follower,this.state.followee,null)
				.catch((err)=>console.log(err))
				.then((res)=>console.log(res));
		}
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
