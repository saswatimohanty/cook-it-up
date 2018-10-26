import React, { Component } from 'react';
import axios from 'axios'
import User from './User'

class AllProfiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users')
    .then(response => {
      this.setState({users: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="all-profiles">
        <h1> All Profiles </h1>

        <div className="Users">
          {this.state.users
            .slice(0)
            .reverse()
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

export default AllProfiles
