// react modules
import React, {Component} from 'react';
import { Button, Card, Col, Container,  Jumbotron, Row, Image, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
// aws modules
import { Auth } from 'aws-amplify';
// components
import DBOps, { getFollowedPost, searchPost } from '../DBOps.js'
import { searchUser, getUserPosts } from '../DBOps.js'
import Navbar from '../components/Navbar.js';
import FollowList from '../components/FollowList.js';
import Post from '../components/Post.js';
import { UsernameContext } from '../UsernameContext.js';
import './pageCSS/Homepage.css'

class Homepage extends Component {
    constructor(props){
        // props and stats
        super(props)
        this.state = {
            username    : '',
            sort        : 'time',
            filterText  : '',
			filterTopic : '',
            myposts     : []
        }
        // bind functions
        this.showPosts = this.showPosts.bind(this);
		this.handleChangeSort = this.handleChangeSort.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleChangeTopic = this.handleChangeTopic.bind(this);
    }

    showPosts(props){
		if (this.state.myposts.length > 1) {
            if (this.state.sort === 'time') {
                console.log("Sorting posts by time posted");
				this.state.myposts.sort((a,b) => new Date(b.timestamp).getTime()
					- new Date(a.timestamp).getTime());
            }
            else if (this.state.sort === 'relevancy') {
				console.log("Sorting posts by relevancy to user");
				this.state.myposts.sort((a,b) => b.relevance - a.relevance);

			}
            else if (this.state.sort === 'potential') {
                console.log("Sorting posts by potential for engagement");
				this.state.myposts.sort((a,b) => b.pfe - a.pfe);
			}
		}
		if (this.state.filterTopic !== null) {
			console.log(this.state.filterTopic);
		}
		console.log("myposts");
		console.log(this.state.myposts);
		var a = this.state.myposts.map(post => post.topics.map(obj => obj.topic.id));
		console.log(a);
		var posts;
		if (this.state.filterTopic === '') {
			posts = this.state.myposts.map(post => <Post
				key={new Date(post.timestamp).getTime()}
				id={post.id}/>);
			}
		else {
			posts = this.state.myposts
				.filter(post => {
					var topics = post.topics.map(obj => obj.topic.id);
					return topics.includes(this.state.filterTopic);
				})
				.map(post => <Post
					key={new Date(post.timestamp).getTime()}
					id={post.id}/>);
		}
		console.log("posts")
		console.log(posts);
		return (
			<ul>{posts}</ul>
		)
	}

	handleChangeSort(event){
		this.setState({ sort: event.target.value });
		console.log("Set sort state to :" + event.target.value);
	}

	handleChangeText(event){
		this.setState({ filterText: event.target.value });
		console.log("Set filterText state to :" + event.target.value);
	}

	handleChangeTopic(event){
		this.setState({ filterTopic: this.state.filterText });
		console.log("Set filterTopic state to :" + this.state.filterText);
    }

    async componentDidMount(){
        console.log("Context test:", this.context.username);
		Auth.currentAuthenticatedUser({ bypassCache: true })
			.catch((err)=>{
				console.log('Homepage.js Error getting user', err);
			})
			.then((user)=>{
				console.log('Homepage.js got authenticated user', user);
        		if(user.username !== null) {
					console.log("Getting user posts for user");
					console.log(user.username);

					getFollowedPost(user.username)
					.catch((err)=>{
						console.log('Homepage.js error getting posts', err);
					})
					.then((res) => {
						console.log("User info: ");
						if ( res !== null && res.length > 0){
							console.log(res);
							this.setState({myposts:[]},()=>{
								this.setState({myposts: res})
							});
						}
					});
        		}
			});
    }

    render() {

        const { name, url} = this.state
        var t7 = " Twistter 7"
        return (
        		<Row>
            		<Col>
                		<Navbar username={this.context.username}></Navbar>
            		</Col>

            		<Col
                		xs={6}>
                		<Container
                    		className="My homepage">
                    		<Jumbotron>
                                <h1><FontAwesomeIcon icon={faBook}/>{t7}</h1>
                    		</Jumbotron>
                		</Container>

                		<Container
                    		className="timeline">
                    		<Jumbotron>
                            <h3>Your Timeline</h3>
                            <hr/>
                            <Row>
                                <Col>
                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-default">Sort by: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <select onChange = {this.handleChangeSort}>
                                            <option value="time">Time Posted</option>
                                            <option value="relevancy">Relevancy</option>
                                            <option value="potential">Engagement Potential</option>
                                        </select>
                                        </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-default">Filter by: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            type="text"
                                            placeholder="insert topics here"
                                            onChange={this.handleChangeText}
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            />
                                        <InputGroup.Append>
                                            <Button
                                                variant="outline-secondary"
                                                type="submit"
                                                onClick={this.handleChangeTopic}>
                                                Submit
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    </Col>
                            </Row>
							<hr/>
							<this.showPosts/>
                    		</Jumbotron>
                		</Container>
            		</Col>

            		<Col>
            		</Col>
      		</Row>
    );
  }
}
Homepage.contextType = UsernameContext;
export default Homepage;
