import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './SignUp.css';
//import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div className="SignUp">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
 
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
 
  onSubmit = (event) => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/PageTwo");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

 
  render() {

    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit} className="SignUp">
       <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">
          Sign Up
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account?
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };