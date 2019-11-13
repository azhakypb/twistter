// react modules
import React, { Component } from 'react';
import { Card, Col, Container,  Jumbotron, Row, Image } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import Navbar from '../components/Navbar.js'
import FollowList from '../components/FollowList.js'
import { UsernameContext } from '../UsernameContext.js';
class Profile extends Component {

    constructor(props){
        //props and stats
        super(props)
        this.state = {
            name        : '',
            username    : '',
            url         : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png'
        }
        // bind functions
    }

    async componentDidMount(){
		console.log('Context test 2:', this.context.username);
      	  var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      //  this.setState({username: user.username});
        if( user.attributes.hasOwnProperty('picture') ){ this.setState({url : user.attributes.picture}); }
        if( user.attributes.hasOwnProperty('name'   ) ){ this.setState({name: user.attributes.name   }); }
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
                    		className="My profile">
                    		<Jumbotron>
                        		<Card style={{width: '18rem'}}
                            	className="bg-dark text-black">
                            	<Card.Img
                                	src={url}
                            	/>
                        		</Card>
                        		<h1>{name}</h1>
                        		<h2>@{this.context.username}</h2>
                    		</Jumbotron>
                		</Container>

                		<Container
                    		className="timeline">
                    		<Jumbotron>
                        		<Image style={{width: '2rem'}}
                            		src={url}
                            		roundedCircle
                        		/>
                        		<p>{name}<br />@{this.context.username} </p>
                    		</Jumbotron>
                		</Container>
            		</Col>

            		<Col>
            			<FollowList username={this.context.username}></FollowList>
            		</Col>
      		</Row>
    );
  }
}
Profile.contextType = UsernameContext;
export default Profile;
