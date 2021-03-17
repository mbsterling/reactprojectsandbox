import React, { Component, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './SignUp.css';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = (props) => (
  <div className="SignUp">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
 
const SignUpFormBase = (props) => {

  const [allValues, setAllValues] = useState({
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  }); 

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };      

  const onSubmit = (e) => {
      const { username, email, passwordOne, passwordTwo, error } = {...allValues};

  props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      //setAllValues({ ...INITIAL_STATE });
      props.history.push(ROUTES.SIGN_IN);
    })
    .catch(error => {
      const userInfo = {...allValues};
      userInfo.error = error;
      setAllValues({...userInfo});
    });

  e.preventDefault();
  };
    
  const onChange = (e) => {
      setAllValues({...allValues, [e.target.name]: e.target.value });
  };
 
  const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = [...allValues];

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
      
    <form onSubmit={onSubmit}>
        <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
          Sign Up
      </button>

      {allValues.error && <p>{allValues.error.message}</p>}
      
    </form>
  );

}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };