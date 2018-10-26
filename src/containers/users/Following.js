// import React, { Component } from 'react';
// import {Image, Grid, Col, Button, Table} from 'react-bootstrap';
// import FollowingProfiles from './FollowingProfiles'
// import axios from 'axios'
// import './UserProfile.css'

// class Following extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       following: []
//     }
//   }

//   componentDidMount() {
//     this.getFollowingProfiles()
//   }

//   getFollowingProfiles = () => {
//     axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}/get_following`)
//     .then(response => {
//       this.setState({following: response.data.following})
//     })
//     .catch(error => console.log(error))
//   }

//   render() {
//     return(
//       <div className="container">
//         <div className="AttrTitle">
//           <h3>Profiles I follow</h3>
//         </div>
//         <div className="AttrIndex">
//           <div className="AttrTable">
//             <Table striped bordered condensed hover>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Number of Recipies</th>
//                   <th>Followers</th>
//                   <th>Following</th>
//                   <th>Unfollow</th>
//                 </tr>
//               </thead>
//               <FollowingProfiles followingProfiles={this.state.following}/>
//             </Table>
//           </div>

//           <br />
//         </div>
//       </div>
//     );
//   }
// };

// export default Following;



import React, { Component } from 'react';
import axios from 'axios'
import User from './User'

class Following extends Component {
  constructor(props){
    super(props);
    this.state = {
      following: []
    }
  }

  componentDidMount() {
    this.getFollowingProfiles()
  }

  getFollowingProfiles = () => {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}/get_following`)
    .then(response => {
      this.setState({following: response.data.following})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="all-profiles">
        <h1> Profiles I follow </h1>

        <div className="Users">
          {this.state.following
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

export default Following
