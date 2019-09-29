// react modules
import React, { Component } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Jumbotron, Row, Image} from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import Navbar from '../components/Navbar.js'

class Profile extends Component {

    constructor(props){
        //props and stats
        super(props)
        this.state = {
            name        : '',
            username    : '',
            url         : 'http://best-hack.net/customavatars/avatar98809_1.gif'
        }
        // bind functions
    }

    async componentDidMount(){

        var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        this.setState({username: user.username});
        if( user.attributes.hasOwnProperty('picture') ){ this.setState({url : user.attributes.picture}); }
        if( user.attributes.hasOwnProperty('name   ') ){ this.setState({name: user.attributes.name   }); }
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
                    className="My profile">
                    <Jumbotron>
                        <Card 
                            className="bg-dark text-black">
                            <Card.Img 
                                src={url} 
                            />
                        </Card>
                        <h1>{name}</h1>
                        <h2>@{username}</h2>
                    </Jumbotron>
                </Container>

                <Container 
                    className="timeline">
                    <Jumbotron>
                        <Image 
                            src="https://sc02.alicdn.com/kf/HTB1pfgTHFXXXXczXVXXq6xXFXXXc/110x110-size-Compressed-wooden-pallet.jpg_50x50.jpg" 
                            roundedCircle
                        />
                        <p>My Name</p>
                    </Jumbotron>
                </Container>
            </Col>

            <Col>
                <h1>.</h1>
            </Col>
      </Row>
    );
  }
}

export default Profile;
