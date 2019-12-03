// react modules
import React, { Component } from 'react';
import { Button, Card, Col, Container, Dropdown, DropdownButton, Jumbotron, Row, Image, InputGroup, FormControl } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import { searchUser, getUserPosts, searchPost } from '../DBOps.js'
import Navbar from '../components/Navbar.js';
import FollowList from '../components/FollowList.js';
import Post from '../components/Post.js';
import { UsernameContext } from '../UsernameContext.js';
import './pageCSS/Profile.css'
class Profile extends Component {

    constructor(props){
        //props and stats
        super(props)
        this.state = {
            name        : '',
			username    : '',
			myposts		: [],
			url         : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png'
        }
		// bind functions
		this.showPosts = this.showPosts.bind(this);
	}

	showPosts(props){
		console.log("Sorting posts by timestamp");
		if (this.state.myposts.length > 1)
			this.state.myposts.sort((a,b) => b.key - a.key);
		return (
			<ul>{this.state.myposts}</ul>
		)
	}

    async componentDidMount(){
		Auth.currentAuthenticatedUser({ bypassCache: true })
			.catch((err)=>{
				console.log('Profile.js error getting user', err);
			})
			.then((user)=>{
				console.log('Profile.js got user', user);
	  			this.setState({username: user.username});
        		if( user.attributes.hasOwnProperty('picture') ){ this.setState({url : user.attributes.picture}); }
				if( user.attributes.hasOwnProperty('name'   ) ){ this.setState({name: user.attributes.name   }); }
				if(user.username !== null) {
					console.log("Getting posts by user");
					getUserPosts(user.username)
						.catch((err)=>{
							console.log('Profile.js error getting posts', err);
						})
						.then((res) => {
							console.log("User info: ");
							console.log(res.data.getUser.posts.items);
							if (!(res.data.getUser === null) && res.data.getUser.posts.items.length > 0){
								this.setState({myposts:[]},()=>{
								this.setState({ myposts: res.data.getUser.posts.items
									.map( post => <Post key={new Date(post.timestamp).getTime()} id={post.id}/>)});
								})

							}
						});
				}
			});
	}

    render() {

        const { name, url} = this.state

        return (
        		<Row>
            		<Col>
                		<Navbar username={this.context.username}></Navbar>
            		</Col>

            		<Col
                		xs={6}>
                		<Container
                    		className="my-profile">
                    		<Jumbotron className="profileInside">
                        		<Card style={{width: '18rem'}}
                            	>
                            	<Card.Img
                                	src={url}
                            	/>
                                <Card.Body>
                                    <Card.Text>
                                     <p>Name: {name}</p>
                                     Username: @{this.context.username}
                                    </Card.Text>
                                </Card.Body>
                        		</Card>
                    		</Jumbotron>
                		</Container>

                		<Container
                    		className="timeline">
                    		<Jumbotron className="timelineInside">
								<hr/>
								<this.showPosts/>
                    		</Jumbotron>
                		</Container>
            		</Col>

            		<Col>
						<Jumbotron>
            				<FollowList username={this.context.username}></FollowList>
						</Jumbotron>
            		</Col>
      		</Row>
		);
	}
}
Profile.contextType = UsernameContext;
export default Profile;
