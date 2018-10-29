import React, {Component} from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
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
      <ul className="header">
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to='/login'>Log In</NavLink> </li>
        <li><NavLink to='/signup'>Sign Up</NavLink> </li>
      </ul>
    );

    const userHeader = (
      <ul className="header">
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/user_profile">Profile</NavLink></li>
        <li><NavLink to="/followers">Followers</NavLink></li>
        <li><NavLink to="/following">Following</NavLink></li>
        <li><NavLink to="/all_profiles">All Profiles</NavLink></li>
        <li className="log-out" onClick={(e) => this.handleLogout(e)}>Log Out</li>
      </ul>
    );

    return (
      <header>
        <nav>
          <div className="container">
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
