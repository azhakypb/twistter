// react modules
import React, { Component } from 'react';
import {Button, Card, Col, Container, Jumbotron, Row, Image, Modal} from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import Navbar from '../components/Navbar.js'
import DBOps from '../DBOps.js'
import Post from '../components/Post.js'
import { createFollow, deleteFollow, searchUser, getUserPosts } from '../DBOps.js'
import awsmobile from '../aws-exports.js'
import FollowList from '../components/FollowList.js'
import { UsernameContext } from '../UsernameContext.js';
import TopicView from  '../components/TopicView.js';
var AWS = require('aws-sdk');

class OtherProfile extends Component {

    constructor(props){
        //props and stats
        super(props)
        this.state = {
            name                : '',
            username            : '',
            url                 : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png',
            me                  : '',
            posts               : [],
            show        : false
        }
        this.notifState = {
          userid: "",
          text: "",
          time: 0
        }
        // bind functions
        this.showPosts = this.showPosts.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.setState = this.setState.bind(this);
    }

    showPosts(props){
        console.log("Sorting posts by timestamp");
        console.log(this.state.posts);
        if (this.state.posts.length > 1)
			this.state.posts.sort((a,b) => b.key - a.key);
		return (
			<ul>{this.state.posts}</ul>
		)
	}

    async componentDidMount(){

        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
                                                                                        region: awsmobile.aws_cognito_region,
                                                                                        accessKeyId: "AKIA6PTGMIK45Y2CRIYF",
                                                                                        secretAccessKey: "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"
                                                                                    });


        this.params = {
            UserPoolId: awsmobile.aws_user_pools_id, /* required */
            Username: window.location.href.split('/').slice(-1)[0] /* required */
        };
        var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        await this.setState({me: user.username, username: window.location.href.split('/').slice(-1)[0]});

        // redirect if viewing own profile
		if(this.params.Username === user.username){
          	document.location.href = "/";
		}


        cognitoidentityserviceprovider.adminGetUser(this.params, (err, data) => {

            if (err){
			    console.log(err, err.stack); // an error occurred
				//if user does not exist, redirect to own profile
				if(err.code === 'UserNotFoundException'){
					document.location.href = "/";
				}
            } else{

                this.setState({ username: window.location.href.split('/').slice(-1)[0] });

                for(var i = 0; i < data.UserAttributes.length; i++ ){
                    if( data.UserAttributes[i].Name === 'name'){
                        this.setState({name:data.UserAttributes[i].Value})
                    }
                    else if(data.UserAttributes[i].Name === 'picture'){
                        this.setState({url:data.UserAttributes[i].Value})
                    }

                }

            }
        });

        
        if(this.state.username !== null) {
            console.log("Getting posts by...");
            console.log(window.location.href.split('/').slice(-1)[0]);
			getUserPosts(window.location.href.split('/').slice(-1)[0]).then((res) => {
				console.log("User info: ");
				console.log(res.data.getUser.posts.items);
				if (!(res.data.getUser === null) && res.data.getUser.posts.items.length > 0){
					this.setState({posts:[]},()=>{
                        this.setState({ posts: res.data.getUser.posts.items
                            .map( post => <Post key={new Date(post.timestamp).getTime()} id={post.id}/>)});
					})
					
				}
			})
		}
        
    }

    async follow(){

        var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        var username = user.username;

        createFollow(username,this.state.username)
            .then((res)=>{
                console.log('other profile','follow','success',res);
            })
            .catch((err)=>{
                console.log('other profile','follow','error',err);
            });
    }

    async unfollow(){

       // var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
       // var username = user.username;

        deleteFollow(this.context.username,this.state.username)
            .then((res)=>{
                console.log('other profile','unfollow','success',res);
            })
            .catch((err)=>{
                console.log('other profile','unfollow','error',err);
            });
    }

    setShow(bool){
        this.setState({show: bool});
    }

    render() {

        const { show, name, username, url, me } = this.state

        return (
        <Row>
            <Col>
                <Navbar></Navbar>
            </Col>

            <Col
                xs={6}>
                <Container
                    className="OtherProfile">
                    <Jumbotron>
                        <Card style={{width: '18rem'}}
                            className="bg-dark text-black">
                            <Card.Img
                                src={url}
                            />
                        </Card>
                        <h1>{name}</h1>
                        <h2>@{username}</h2>
						<Button onClick={this.follow} aria-label="Follow">Follow</Button>
						&nbsp;
						<Button onClick={this.unfollow} aria-label="Unfollow">Unfollow</Button>
						&nbsp;
                        <Button onClick={()=>this.setShow(true)} aria-label="Manage Topics">Manage Topics</Button>
                    </Jumbotron>
                </Container>

                <Container
                    className="timeline">
                    <Jumbotron>
                        <h3>{username}'s Timeline</h3>
                        <hr/>
                        <this.showPosts/>
                    </Jumbotron>
                </Container>
            </Col>

            <Col>
				<Jumbotron>
                	<FollowList username={username}></FollowList>
				</Jumbotron>
            </Col>
            <Modal show={show} onHide={()=>this.setShow(false)}>
                <Modal.Body>
                    <TopicView follower={me} followee={username}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>this.setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
      </Row>
    );
  }
}

OtherProfile.contextType = UsernameContext;
export default OtherProfile;
