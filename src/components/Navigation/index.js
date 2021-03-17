
import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => {

const navStyle = {display: props.navVisible };

    return (
        <div className="Navigation" style={navStyle}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/PageTwo"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Page Two</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/PageThree/:id"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Page Three</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
