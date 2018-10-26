import React, { Component } from 'react';
import axios from 'axios'
import User from './User'

class Followers extends Component {
  constructor(props){
    super(props);
    this.state = {
      followers: []
    }
  }

  componentDidMount() {
    this.getFollowerProfiles()
  }

  getFollowerProfiles = () => {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}/get_followers`)
    .then(response => {
      this.setState({followers: response.data.followers})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="all-profiles">
        <h1> Followers </h1>

        <div className="Users">
          {this.state.followers
            .map(user => (
              <User
                firstName={user.first_name}
                lastName={user.last_name}
                emailId={user.email}
                userId={user.id}
                key={user.id}
                currentUser={this.props.currentUser} />
            ))}
        </div>
      </div>
    );
  }
}

export default Followers
