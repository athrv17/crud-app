import {useEffect, useState} from 'react';

import { Table, TableBody, TableCell, TableRow, TableHead , styled, Button} from "@mui/material";
import { Link } from 'react-router-dom';
import { getUSers } from "../Service/api";
import { deleteUser } from '../Service/api';

const StyledTable=styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`

const Thead=styled(TableRow)`
    background:#43687d;
    & > th{
        font-size: 20px;
        color: #FFFFFF;
    }
`
const Tbody=styled(TableRow)`
    & > td{
        font-size:18px
    }
`

const AllUsers=()=>{
    const[users,setUsers]=useState([]);
    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails=async()=>{
        let response=await getUSers();
        console.log(response);
        setUsers(response.data);
    }

    const deleteUserData=async(id)=>{
        await deleteUser(id);
        getUserDetails();
    }

    return(
        <StyledTable>
            <TableHead>
                <Thead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    
                </Thead>
            </TableHead>
            <TableBody>
                {
                    users.map(user => (
                        <Tbody>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                <Button variant='contained' style={{marginRight:10}} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                                <Button variant='contained' color='secondary' onClick={()=>deleteUserData(user.id)}>Delete</Button>
                            </TableCell>
                        </Tbody>
                    ))
                }
            </TableBody>
        </StyledTable>
    )
}

export default AllUsers;

