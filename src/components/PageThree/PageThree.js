import React, { useContext } from 'react';
import { AuthContext } from '../../containers/App/App';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './PageThree.css';


const PageThree = (props) => {

    const authContext = useContext(AuthContext);
    console.log(authContext);

    return (
        <div>
            {authContext.authenticated ?
                <h1>PAGE THREE</h1>
                :
                <h1>GO BACK TO PAGE TWO</h1>
            }
        </div>
    );

}

export default withRouter(PageThree);