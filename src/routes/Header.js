import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css'
import { logout } from '../actions/authActions';

class Header extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    const logoLink = (
      <li id="logo"><Link to="/">Cook It Up!</Link></li>
    )

    const mainHeader = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/about">About</Link></li>
        <li> <Link className='link' to='/login'>Log In</Link> </li>
        <li> <Link className='link' to='/signup'>Sign Up</Link> </li>
      </ul>
    );

    const userHeader = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/user_profile">Profile</Link></li>
        <li><Link to="/recipes_container">My Recipes</Link></li>
        <li><Link to="/followers">Followers</Link></li>
        <li><Link to="/following">Following</Link></li>
        <li><Link to="/all_profiles">All Profiles</Link></li>
        <li onClick={(e) => this.handleLogout(e)}>Log Out</li>
      </ul>
    );

    return (
      <header>
        <nav>
          <div className="header">
            <section id="header" className="appear">
              <div className="navbar navbar-fixed-top">
                <div className="navbar-collapse collapse">
                  <ul className="nav navbar-nav navbar-left">
                    {logoLink}
                  </ul>
                  {this.props.isAuthenticated ? userHeader : mainHeader}
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header = withRouter(connect(null, {logout})(Header));
