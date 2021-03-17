import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './SignUp.css';
import Firebase from 'firebase';
import { AuthContext } from '../../containers/App/App';

const SignUpPage = (props) => (
  <div className="SignUp">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpFormBase = (props) => {

  const authContext = useContext(AuthContext);
  //console.log(authContext);
  //let test = authContext.authenticated;

  //let ref = Firebase.database().ref('/');

  //var recommendations = ref.child("recommendations");
  // Push our first recommendation to the end of the list and assign it a
  // unique ID automatically.
  // recommendations.push({
  //   "title": "The danger of a single story",
  //   "presenter": "Chimamanda Ngozi Adichie",
  //   "link": "https://www.ted.com/talks/chimamanda_adichie_the_danger_of_a_single_story"
  // });

  const [foundUser, setFoundUser] = useState({});

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
    const { username, email, passwordOne, passwordTwo, error } = { ...allValues };

    props.firebase
      .doSignInWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //setAllValues({ ...INITIAL_STATE });
        setFoundUser(authUser.user);
        console.log(props.firebase.auth);
        authContext.authenticated = true;
        authContext.userEmail = email;
        props.history.push("/PageTwo");
      })
      .catch(error => {
        const userInfo = { ...allValues };
        userInfo.error = error;
        setAllValues({ ...userInfo });
      });

      var user = Firebase.auth().currentUser;

      if (user) {
        console.log(user.email);
      } else {
        // No user is signed in.
      }

      var userName = "msterling";

      //https://stackoverflow.com/questions/48240734/how-to-query-in-firebase-in-react
      let userRef = Firebase.database().ref('/users');
      var userQuery = userRef.orderByChild("UserName").equalTo(userName);
      userQuery.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.key, child.val().Active);
        });
      });

    //from my experts exchange question  
    //   firebase.database().ref('users')
    // .orderByChild('UserName')
    // .equalTo('msterling')
    // .once('value', function (snapshot) {
    //     console.log(snapshot.val())
    // })

    e.preventDefault();
  };

  const onChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
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
    Don't have an account? <Link to="/SignIn">Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };