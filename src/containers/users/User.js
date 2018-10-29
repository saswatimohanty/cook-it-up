import React, { Component } from "react";
import axios from 'axios'
import {Grid, Col, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./User.css";
import update from 'immutability-helper'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      followingProfilesCount: null,
      followerProfilesCount: null,
      recipesCount: null,
      userIsFollowing: null
    }
  }

  componentDidMount() {
    this.getFollowingProfilesCount()
    this.getFollowersProfilesCount()
    this.getUserRecipesCount()
    this.followingOrNot()
  }

  getFollowingProfilesCount = () => {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.userId}/get_following`)
    .then(response => {
      this.setState({followingProfilesCount: response.data.following_profiles})
    })
    .catch(error => console.log(error))
  }

  getFollowersProfilesCount = () => {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.userId}/get_followers`)
    .then(response => {
      this.setState({followerProfilesCount: response.data.follower_profiles})
    })
    .catch(error => console.log(error))
  }

  getUserRecipesCount = () => {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.userId}/get_user_recipes`)
    .then(response => {
      this.setState({recipesCount: response.data.user_recipes_count})
    })
    .catch(error => console.log(error))
  }

  followingOrNot = () => {
    axios.get(
      `http://localhost:3001/api/v1/users/${this.props.currentUser.id}/is_following`,
      {
        params: {
          other_user: this.props.userId
        }
      }
    )
    .then(response => {
      this.setState({userIsFollowing: response.data})
    })
    .catch(error => console.log(error))
  }

  followUser = () => {
    axios.get(
      `http://localhost:3001/api/v1/users/${this.props.currentUser.id}/follow_user`,
      {
        params: {
          other_user: this.props.userId
        }
      }
    )
    .then(response => {
      const users = update(this.state.users, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({users: users})
    })
    .catch(error => console.log(error))
  }

  unFollowUser = () => {
    axios.get(
      `http://localhost:3001/api/v1/users/${this.props.currentUser.id}/unfollow_user`,
      {
        params: {
          other_user: this.props.userId
        }
      }
    )
    .then(response => {
      const users = update(this.state.users, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({users: users})
    })
    .catch(error => console.log(error))
  }

  render() {
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const emailId = this.props.emailId;
    const userId = this.props.userId
    const avatar = null;

    const followButton = (
      <Button bsStyle="primary" onClick={this.followUser}>Follow</Button>
    )

    const unFollowButton = (
      <Button bsStyle="danger" onClick={this.unFollowUser}>Unfollow</Button>
    )

    return (
      <div>
        <article className="user">
          <header>
            <div className="Post-user">
              <div className="user-avatar">
                <img src={avatar} alt={firstName} />
              </div>
              <div className="row">
                <div className="user-name">
                  <span>{firstName} {lastName}</span>
                </div>
                <div>
                  Email: {emailId}
                </div>
              </div>
              <div className="show-buttons">
                {this.state.userIsFollowing ? unFollowButton : followButton}
                <Link className="btn btn-warning" to={`recipes_container/${userId}`}>View Recipies</Link>
              </div>
            </div>
          </header>
          <Grid>
            <Col md={1}>
              <div className='margin-left-1'>
                <b>Following</b><br />
                {this.state.followingProfilesCount}
              </div>
            </Col>

            <Col md={1}>
              <div className='margin-left-1'>
                <b>Followers</b><br />
                {this.state.followerProfilesCount}
              </div>
            </Col>

            <Col md={2}>
              <div className='margin-left-1'>
                <b>Recipes Added</b><br />
                {this.state.recipesCount}
              </div>
            </Col>
          </Grid>
        </article>
      </div>
    );
  }
}

export default User;
