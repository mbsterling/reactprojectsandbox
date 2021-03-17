import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import PageTwo from './components/PageTwo/PageTwo';
import PageThree from './components/PageThree/PageThree';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render((
    <FirebaseContext.Provider value={new Firebase()}>
        <div className="Index">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    </FirebaseContext.Provider>
),
    document.getElementById('root'));
registerServiceWorker();
