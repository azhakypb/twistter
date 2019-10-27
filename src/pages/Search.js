// react modules
import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
import { useHistory } from "react-router"
// aws modules
import { Auth } from 'aws-amplify' 
// components
import Navbar from '../components/Navbar.js'
import Post from '../components/Post.js'
import Userlist from '../components/Userlist.js'

class Search extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = { 
            text        : '',
            search      : '',
            showResults : false,
            posts       : [
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>,
                <Post></Post>
            ]
        };

        // bind functions
        this.Results = this.Results.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
    
        console.log(Auth.currentAuthenticatedUser());
    }
    // list of posts
    Results(props) {
        if (this.state.showResults) return (
            <div>
                <Jumbotron>
                    <h2>Searching for... {this.state.search}</h2>
                    {this.state.posts.map(
                        (posts) => (<ul>{posts}</ul>)
                    )}
                </Jumbotron>
            </div>
        )
        else return (
            <div />
        )
    }
    // input field handlers
    handleChangeText  (event){
        this.setState({ text: event.target.value });
    }
    // submission field handlers
    async handleSubmitText(event){
        if (!Object.is(this.state.text, '')) {
            this.setState({ search: this.state.text });
            this.setState({ showResults: true });
        }
    }
    

    render() {
        return (
            <Row>
                <Col>
                    <Navbar></Navbar>
                </Col>
                <Col md="6" xs="10">
                    <Jumbotron>
                        <h2>Search</h2>

                        <InputGroup
                            className="mb-3"
                            value={this.state.search}
                            onChange={this.handleChangeText}>
                            <FormControl
                                placeholder="Type Topic Here"
                                aria-label="Type Topic Here"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleSubmitText}>
                                    Search
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Jumbotron>
                    <this.Results />
                    
                </Col>                
                <Col>
                    <p>.</p>
                </Col>
            </Row>
        );
    }
}

export default Search;