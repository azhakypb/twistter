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
import DBOps from '../DBOps.js';

const searchPost = `query getPost($id: ID!) {
    getPost(id: $id) {
        topics {items {id}}
    }
}`

class Search extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = { 
            text        : '',
            search      : '',
            showResults : true,
            posts       : [
                <p>1</p>,
                <p>2</p>,
                <p>3</p>,
                <p>4</p>,
                <p>5</p>,
                <p>6</p>,
                <p>7</p>,
                <p>8</p>,
                <p>9</p>,
                <p>0</p>
            ]
        };

        this.searchState = {
            id: ""
        }

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
                    <ul>{this.state.posts}</ul>
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
    
    handleSubmitText = async() => {
        if (!Object.is(this.state.text, '')) {
            this.setState({ search: this.state.text });
            console.log("Set search state to: " + this.state.text);

            this.setState({id: this.state.text});
            console.log("Searching posts",this.searchState);
            
            this.setState({id:this.searchState.id});
            const listPosts = this.state.posts.map(
                (post => <Post id={this.searchState.id}></Post>)
            );

            this.setState({ posts: listPosts});
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