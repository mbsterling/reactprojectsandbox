import app from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyCcgGfaAj_wfNCkkC0HOWlhsKmZ2mA-P-8",
  authDomain: "tracker-base.firebaseapp.com",
  databaseURL: "https://tracker-base.firebaseio.com",
  projectId: "tracker-base",
  storageBucket: "tracker-base.appspot.com",
  messagingSenderId: "500951447636",
  appId: "1:500951447636:web:4f1ad10c6a55d99d36d5c1",
  measurementId: "G-H5N4PK9XFD"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;