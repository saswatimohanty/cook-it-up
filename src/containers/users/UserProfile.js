import React, { Component } from 'react';
import {Image, Grid, Col, Button} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom'
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
        <Grid>
          <Link className="btn btn-warning" to={`recipes_container/${this.props.currentUser.id}`}>View Recipies</Link>
        </Grid>
      </div>
    );
  }
};

export default UserProfile;
