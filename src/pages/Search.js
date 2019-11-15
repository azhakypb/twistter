// react modules
import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, ListGroup, Jumbotron, Row, DropdownButton, ListGroupItem } from 'react-bootstrap';
// aws modules
// components
import Navbar from '../components/Navbar.js'
import { getFollowing, searchTopic } from '../DBOps.js'
import Post from '../components/Post.js'
import UserlistItem from '../components/UserlistItem.js'
import FollowList from '../components/FollowList.js'

class Search extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = { 
            text        : '',
            search      : '',
            showResults : 0,
            searchType  : '',
            posts       : []
        };
        // bind functions
        this.Results = this.Results.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
    }
    // list of posts
    Results(props) {
        if (this.state.showResults === 1 &&
            this.state.searchType !== "#" && this.state.searchType !== "@") return (
            <div>
                <Jumbotron>
                    <h2>Not a valid search</h2>
                    <h2>Please begin search with '#' for posts or '@' for users</h2>
                </Jumbotron>
            </div>
        )
        if (this.state.showResults === 1) return (
            <div>
                <Jumbotron>
                    <h2>Search results for {this.state.search}</h2>
                    <ul>{this.state.posts}</ul>
                </Jumbotron>
            </div>
        )
        else return (
            <div>
                <Jumbotron>
                    <h2>Please enter topic or username above</h2>
                </Jumbotron>
            </div>
        )
    }
    // input field handlers
    handleChangeText  (event){
        this.setState({ text: event.target.value });
        console.log("Search page\n" + 
            "handleChangeText function\n" +
            "Set text state to :" + event.target.value);
    }

    // submission field handlers
    
    handleSubmitText = async() => {
        if (!Object.is(this.state.text, '')) {
            this.state.search = this.state.text.slice(1);
            //this.setState({ search: this.state.text.slice(1) });
            console.log("Search page\n" + 
                "handleChangeText function\n" +
                "Set search state to :" + this.state.text);
            
            this.state.searchType = this.state.text[0];
            console.log(this.state.searchType);
            console.log(this.state.search);

            if (this.state.searchType == "#") {
                console.log("Searching for posts w/ topic\n" +
                    "Topic = " + this.state.search);
                searchTopic(JSON.stringify({id: this.state.search}))
                    .then((res)=>{
                        console.log("Search page\n" + 
                            "handleChangeText function\n" +
                            "Search topic result", res, this.state.search);
                        console.log(res);
                        console.log(res.data.getTopics);
                        
                        if( !(res.data.getTopics === null) && res.data.getTopics.posts.items.length > 0 ){
                            this.setState({posts:[]},()=>{
                                    this.setState({ posts: res.data.getTopics.posts.items.map( post => <Post key={post.post.id} id={post.post.id}/>)});
                                });
                        }
                        else{

                        }
                    
                    }, (err) => {console.log(err)});
            }

            else if (this.state.searchType == "@") {
                console.log("Searching for users w/ username\n" +
                    "Username contains " + this.state.search);

                    //

                    const users = ["mark", "awsellers"];
                this.setState({posts:[]},()=>{
                    this.setState({posts: users.map(user => <ListGroup.Item href={'/otherprofile/'+user} action key={user}>
                        {user}
                    </ListGroup.Item>)})
                })

                this.setState({posts:[<ListGroup.Item href={'/testing'} action>
                    Check back soon for working version</ListGroup.Item>]});
            }

            else
            {
                console.log("NOT A VALID SEARCH PROMPT!");
            }

            this.setState({ showResults: 1 });
            console.log("Search page\n" + 
                "handleChangeText function\n" +
                "Set showResults state to 1");
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
                                placeholder="Type Topic or Username Here"
                                aria-label="Type Topic or Username Here"
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
                    
                </Col>
            </Row>
        );
    }
}

export default Search;