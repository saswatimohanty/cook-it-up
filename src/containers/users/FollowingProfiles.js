import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class FollowingProfiles extends Component {

  render() {
    const emptyMessage = (
      <tr>
        <td colSpan="7">You donot follow anyone.</td>
      </tr>
    )

    const followingProfiles = this.props.followingProfiles.map(profile =>
        <tr className='AttrInfo' key={profile.id}>
          <td>{profile.name}</td>
          <td>{profile.recipes.count}</td>
          <td>{profile.followers.count}</td>
          <td>{profile.following.count}</td>
          <td><Button bsStyle="link" onClick={() => this.props.deleteIns(profile.id)}>Unfollow</Button></td>
        </tr>
    )

    return (
      <tbody>
        {followingProfiles.length === 0 ? emptyMessage : followingProfiles}
      </tbody>
    )
  }
};

export default FollowingProfiles;
