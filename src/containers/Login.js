import React from 'react'
import './Form.css'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormErrors } from './FormErrors';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                   emailValid: emailValid,
                   passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  handleLogin = (e) => {
    e.preventDefault();
    if (this.props.authenticate(this.state)) {
      this.props.history.push('/user_profile')
      window.alert("You're Logged In!")
    } else {
      window.alert("Sorry, something went wrong. Please try logging in again.")
    }
  }

  render() {
    return (
      <div className="container">
        <div className="omb_login">
        <h3 className="omb_authTitle">Log In or <Link className="" to='/signup'>Sign Up</Link></h3>
        <h4 className="welcome_msg"> Welcome Back! </h4>

          <div className="row omb_row-sm-offset-3 omb_socialButtons">
            <div className="col-xs-4 col-sm-3">
              <a href="#" className="btn btn-lg btn-block omb_btn-linkedin">
                <span className="hidden-xs">LinkedIn</span>
              </a>
            </div>
            <div className="col-xs-4 col-sm-3">
              <a href="<%= user_github_omniauth_authorize_path %>" className="btn btn-lg btn-block omb_btn-github">
                <i className="fa fa-github" aria-hidden="true"></i>
                <span className="hidden-xs">Github</span>
              </a>
            </div>
          </div>

          <div className="row omb_row-sm-offset-3 omb_loginOr">
            <div className="col-xs-12 col-sm-6">
              <hr className="omb_hrOr" />
              <span className="omb_spanOr">or</span>
            </div>
          </div>

          <div className="panel panel-default margin-27">
            <FormErrors formErrors={this.state.formErrors} />
          </div>

          <div className="row omb_row-sm-offset-3">
            <div className="col-xs-12 col-sm-6">
              <div className="omb_loginForm">
                <form className="demoForm">
                  <div className='form-group'>
                    <label htmlFor="email">Email Address</label>
                    <span><FontAwesomeIcon icon='envelope' /></span>
                    <input type="email" required className="form-control" name="email"
                      placeholder="Email" id="email"
                      onChange={this.handleUserInput}  />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <span><FontAwesomeIcon icon='key' /></span>
                    <input type="password" className="form-control" name="password"
                      placeholder="Password" id="password"
                      onChange={this.handleUserInput}  />
                  </div>

                  <span className="help-block"></span>

                  <button type="submit" className="btn btn-primary col-md-6 col-md-offset-3"
                  onClick={this.handleLogin} >
                    Ready to Go !
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login = withRouter(connect(null, {authenticate})(Login));
