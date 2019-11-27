// react modules
import React, {Component} from 'react';
import { Button, Card, Col, Container,  Jumbotron, Row, Image, InputGroup, FormControl } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify';
// components
import DBOps, { getFollowedPost, searchPost } from '../DBOps.js'
import { searchUser, getUserPosts } from '../DBOps.js'
import Navbar from '../components/Navbar.js';
import FollowList from '../components/FollowList.js';
import Post from '../components/Post.js';
import { UsernameContext } from '../UsernameContext.js';

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
		console.log(this.state.myposts);
		var posts;
		posts = this.state.myposts.map(post => <Post
				key={new Date(post.timestamp).getTime()}
				id={post.id}/>);
		/*if (this.state.filterTopic !== null) {
			posts = posts.filter(post =>
				{return searchPost(post)})
		}*/
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

					getFollowedPost(user.username).then((res) => {
						console.log("Followed posts: ");
						console.log(res);
						
						this.setState({myposts:[]},()=>{
							this.setState({myposts: res
								/*.map(post => <Post
									key={new Date(post.timestamp).getTime()}
									id={post.id}/>)*/
								});
						})

					})
        		}
			});
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
                    		className="My homepage">
                    		<Jumbotron>
                                <h1>Twistter7</h1>
                    		</Jumbotron>
                		</Container>

                		<Container
                    		className="timeline">
                    		<Jumbotron>
								<h3>Your Timeline</h3>
								<hr/>
								<label>
									{"Sort by: "}
									<select onChange = {this.handleChangeSort}>
										<option value="time">Time Posted</option>
										<option value="relevancy">Relevancy</option>
										<option value="potential">Engagement Potential</option>
									</select>
								</label>
								<hr/>
								<label>
									{"Filter by: "}
									<input type="text" placeholder="insert topic here" onChange={this.handleChangeText}/>
									<button type="submit" onClick={this.handleChangeTopic}>Submit</button>
								</label>
								<hr/>
								<this.showPosts/>
                    		</Jumbotron>
                		</Container>
            		</Col>

            		<Col>
						<Jumbotron>
            				<FollowList username={this.context.username}></FollowList>
						</Jumbotron>
            		</Col>
      		</Row>
    );
  }
}
Homepage.contextType = UsernameContext;
export default Homepage;
