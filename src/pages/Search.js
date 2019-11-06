// react modules
import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
// aws modules
// components
import Navbar from '../components/Navbar.js'
import DBOps from '../DBOps.js'
import Post from '../components/Post.js'

class Search extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = { 
            text        : '',
            search      : '',
            showResults : true,
            posts       : []
        };

        this.searchState = {
            id: ""
        }

        // bind functions
        this.Results = this.Results.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
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

            new DBOps().searchTopic(JSON.stringify({id: this.state.text}))
                .then((res)=>{
                    console.log('search topic result',res);
                    if( !(res.getTopics === null) && res.getTopics.posts.items.length > 0 ){
                        this.setState({posts:[]},()=>{
                                this.setState({ posts: res.getTopics.posts.items.map( post => <Post id={post.post.id}/>)});
                            });
                    }
                    else{
                        this.setState({posts:[]});
                    }
                });

            //this.setState({id: this.state.text});
            //console.log("Searching posts",this.searchState);

            //this.setState({id:this.searchState.id});

            //var topicPosts = await new DBOps().searchTopic("kevin");
            //console.log(topicPosts);
            //const arrayPosts = topicPosts.map(
            //    (post) => post
            //);
            //this.setState({posts: arrayPosts});

            //const listPosts = this.state.posts.map(
            //    (post => <Post id={this.state.text}></Post>)
            //);

            //this.setState({ posts: listPosts});
            this.setState({ showResults: true });
        }
    }


    render() {
        return (
            <Row>
                <Col>
                    <Navbar/>
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