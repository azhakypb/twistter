// react modules
import React, { Component } from 'react';
import {Button, Card, Col, Container, Jumbotron, Row, Image} from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import Navbar from '../components/Navbar.js'
import DBOps from '../DBOps.js'
import { createFollow, deleteFollow } from '../DBOps.js'
import awsmobile from '../aws-exports.js'
import FollowList from '../components/FollowList.js'
var AWS = require('aws-sdk');

class OtherProfile extends Component {

    constructor(props){
        //props and stats
        super(props)
        this.state = {
            name        : '',
            username    : '',
            url         : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png',
            me          : ''
        }
        this.notifState = {
          userid: "",
          text: "",
          time: 0
        }
        // bind functions
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
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

        // redirect if viewing own profile
		if(this.params.Username === user.username){
          	document.location.href = "/";
		}


        cognitoidentityserviceprovider.adminGetUser(this.params, (err, data) => {

            if (err){

                console.log(err, err.stack); // an error occurred
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

        var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        var username = user.username;

        deleteFollow(username,this.state.username)
            .then((res)=>{
                console.log('other profile','unfollow','success',res);
            })
            .catch((err)=>{
                console.log('other profile','unfollow','error',err);
            });
    }

    render() {

        const { name, username, url } = this.state

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
						<Button onClick={this.unfollow} aria-label="Unfollow">Unfollow</Button>
                    </Jumbotron>
                </Container>

                <Container
                    className="timeline">
                    <Jumbotron>
                        <Image style={{width: '2rem'}}
                            src={url}
                            roundedCircle
                        />
                        <p>{name}<br />@{username} </p>
                    </Jumbotron>
                </Container>
            </Col>

            <Col>

                <FollowList username={username}></FollowList>

            </Col>
      </Row>
    );
  }
}

export default OtherProfile;
