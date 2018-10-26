import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup } from '../actions/authActions';
import { FormErrors } from './FormErrors';

class Signup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      formErrors: {email: '', password: '', password_confirmation: ''},
      emailValid: false,
      passwordValid: false,
      passwordConfirmationValid: false,
      formValid: false,
    }
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
    let passwordValue = this.state.password
    let passwordConfirmationValid = this.state.passwordConfirmationValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'password_confirmation':
        passwordConfirmationValid = passwordValue === value;
        fieldValidationErrors.password_confirmation = passwordConfirmationValid ? '' : ' Passwords do not match';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                   emailValid: emailValid,
                   passwordValid: passwordValid,
                   passwordConfirmationValid: passwordConfirmationValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid &&
                              this.state.passwordConfirmationValid});
  }

  errorClass(error) {
    // return(error.length === 0 ? '' : 'has-error');
  }

  addNewUser = (e) => {
    e.preventDefault();
    if (this.props.signup(this.state)) {
      this.props.history.push('/user_profile')
      window.alert("Thank you for signing up.")
    } else {
      window.alert("We're having issues creating your account.")
    }
  }

  render () {
    return (
      <form className="demoForm">
        <h3>Sign Up</h3>

        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.first_name)}`}>
          <label htmlFor="first_name">First Name</label>
          <input type="string" required className="form-control" name="first_name"
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.last_name)}`}>
          <label htmlFor="last_name">Last Name</label>
          <input type="string" required className="form-control" name="last_name"
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email Address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password_confirmation)}`}>
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input type="password" className="form-control" name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleUserInput}  />
        </div>

        <button type="submit" className="btn btn-primary col-md-6 col-md-offset-3" disabled={!this.state.formValid}
        onClick={this.addNewUser} >
          Sign Up
        </button>
      </form>
    )
  }
}

export default Signup = withRouter(connect(null, {signup})(Signup));
