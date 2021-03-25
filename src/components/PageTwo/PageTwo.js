import React, {
    useState, useEffect, useContext
} from 'react';
import { withRouter, NavLink, Link, useHistory } from "react-router-dom";
import axios from 'axios';
import './PageTwo.css';
import { O2A } from 'object-to-array-convert';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../containers/App/App';
import Firebase from 'firebase';
import Navigation from '../../components/Navigation';
import TotalTime from '../../components/TotalTime/TotalTime';
import CheckIcon from '@material-ui/icons/Check';


const PageTwo = (props) => {

    //test comment for commit
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const [theTimeLog, getTheTimeLog] = useState([]);

    let theTimeLogList = [];

    useEffect(() => {
        let ref = Firebase.database().ref('/studentTime');
        var refQuery = ref.orderByChild("TimeOut").equalTo("");

        refQuery.on("value", studentTimeLog => {
            theTimeLogList = O2A(studentTimeLog);
            getTheTimeLog(theTimeLogList);
        });
        
        //https://stackoverflow.com/questions/48240734/how-to-query-in-firebase-in-react
        let userRef = Firebase.database().ref('/users');
        var userQuery = userRef.orderByChild("Email").equalTo(authContext.userEmail);
        //console.log(userQuery);
        userQuery.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                if (child.val().Role === "ADMIN") {
                    authContext.isAdmin = true;
                    console.log(authContext.isAdmin);
                }
            });
        });
    }, [window.location.href]);

    const myRedirect = (stdId) => {
        history.push('/PageTwo/:' + stdId);
        //window.location.reload('/PageTwo/:' + stdId);
    }

    return (
        <div>
            {
                authContext.authenticated ?
                    <Navigation navVisible={authContext.isAdmin} /> :
                    <h1>NO NAV</h1>
            }
            <TableContainer component={Paper}>
                <Table className="PageTwo" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align="center">UUID</TableCell> */}
                            <TableCell align="center">Student ID</TableCell>
                            <TableCell align="center">Student Name</TableCell>
                            <TableCell align="center">Time In</TableCell>
                            <TableCell align="center">Time Signed In</TableCell>
                            <TableCell align="center">Week Total</TableCell>
                            <TableCell align="center">Sign Out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {theTimeLog.map(row => (
                            <TableRow key={row.object_key}>
                                {/* <TableCell align="center">
                                    <NavLink
                                        to="/PageThree/:id"
                                        exact
                                        activeClassName="my-active"
                                        activeStyle={{
                                            color: '#fa923f',
                                            textDecoration: 'underline'
                                        }}>
                                        {row.object_key}
                                    </NavLink>
                                </TableCell> */}
                                <TableCell align="center" component="th" scope="row">
                                    <NavLink
                                        to={'/PageThree/' + row.StudentId}
                                        exact
                                        activeClassName="my-active"
                                        activeStyle={{
                                            color: '#fa923f',
                                            textDecoration: 'underline'
                                        }}>
                                        {row.StudentId}
                                    </NavLink>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.StudentName}
                                </TableCell>
                                <TableCell align="center">{row.TimeIn}</TableCell>
                                <TableCell align="center">
                                    <TotalTime timein={row.TimeIn} />
                                </TableCell>
                                <TableCell align="center">{row.TotalMinuts}</TableCell>
                                <TableCell align="center">
                                    <CheckIcon onClick={() => myRedirect(row.StudentId)}/>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default withRouter(PageTwo);