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
            search  : '',
        };
        // bind functions
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    
        console.log(Auth.currentAuthenticatedUser());
    }
    // input field handlers
    handleChangeSearch  (event){this.setState({ search: event.target.value });}
    // submission field handlers
    async handleSubmitSearch(event){
        this.setState({search: 'nope'});
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
                            onChange={this.handleChangeSearch}>
                            <FormControl
                                placeholder="Type Topic Here"
                                aria-label="type topic here"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleSubmitSearch}>                                    >
                                    Search
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Jumbotron>
                    <Jumbotron>
                        <h2>Searching for...</h2>
                        <h2>{this.state.search}</h2>
                    </Jumbotron>
                </Col>                
                <Col>
                    <p>.</p>
                </Col>
            </Row>
        );
    }
}

export default Search;