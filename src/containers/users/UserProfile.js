import React, { Component } from 'react';
import {Image, Grid, Col, Button} from 'react-bootstrap';
import { NavLink, Route } from 'react-router-dom'
import Following from './Following'
import Followers from './Followers'
import RecipesContainer from '../../components/RecipesContainer'
import './UserProfile.css'

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  render() {
    return(
      <div className="container">
        <Grid>
          <Col md={4}>
            <div className="ProfileImage">
              <Image src="/thumbnail.png" thumbnail />
              <Button bsStyle="link">Add Image</Button> | <Button bsStyle="link">Change Image</Button>
              <p>Add an image that gives you joy</p>
            </div>
          </Col>
          <Col md={8}>
            <h1>{this.props.currentUser.first_name}</h1>
          </Col>
        </Grid>

        <div>
          <ul className="header">
            <li><NavLink to="/followers">Followers</NavLink></li>
            <li><NavLink to="/following">Following</NavLink></li>
            <li><NavLink to="/recipes_container">My Recipies</NavLink></li>
            <li><NavLink to="/all_profiles">All Profiles</NavLink></li>
          </ul>
        </div>
      </div>
    );
  }
};

export default UserProfile;
