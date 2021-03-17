import React, { useState, useEffect, useHistory, useContext } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './PageTwo.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../../containers/App/App';

const PageTwo = (props) => {

    const [rows, setRows] = useState([]);
    const authContext = useContext(AuthContext)
    let test = authContext.authenticated;

    useEffect(() => {

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                console.log(response);
                setRows(response.data);
                //authContext.authenticated = rows.length > 0;
            });
    }, []);

    return (
        <div>
            <h1>PAGE TWO</h1>
            <TableContainer component={Paper}>
                <Table className="PageTwo" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.username}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>        
    );
}

export default withRouter(PageTwo);