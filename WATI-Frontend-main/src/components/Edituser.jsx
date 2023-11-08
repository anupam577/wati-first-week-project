import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import { getUsers, editUser } from '../Service/api';
import axios from 'axios';
import mongoose from 'mongoose';

const initialValue = {
    name: '',
    
    email: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    
    const { id } = useParams();
    const { name, email } = user;
    
    let navigate = useNavigate();

   


   const editUserDetails = async () => {
    try {
        // Make sure the 'user' object is properly formatted with the data to update
        const obj={
            ...user, id
        }
        console.log(typeof(id));

        const response = await axios.put(`https://localhost:7126/api/updateFriend/${id}`, obj);
        // console.log('User details edited successfully:', response.data);
        // Optionally, you can navigate to another page after editing the user details
        navigate('/viewlist');
    } catch (error) {
        console.error('Error in editing user details:', error);
        window.alert('Error in editing user details');
    }
};


  
    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
          
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
           
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;