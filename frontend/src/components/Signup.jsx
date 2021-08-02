import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Button } from 'react-bootstrap'
// import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../constants/api';
import axios from 'axios';
import { withRouter } from "react-router-dom";

const Signup = (props) => {
    // Taking care of states of input fields
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmPassword, setCfmPassword] = useState('')

    const handleSubmit = (e) => {
        console.log("Button pressed");
        e.preventDefault();
        if(password === cfmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }

    const sendDetailsToServer = () => {
        const payload={
            "email":email,
            "password":password,
        }
        axios.post('http://localhost:3001/register', payload)
            .then((response) => {
                try {
                    console.log("Post went through");
                    console.log(response.data.status);
                    redirectToLogin();
                } catch (err) {
                    console.log(err.message);
                }
            });
        }
    //              if(response.status === 200){
    //                 localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
    //                 redirectToLogin();
    //             } else{
    //                 props.showError("Some error ocurred");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });


    const redirectToLogin = () => {
        props.history.push('/login');
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className='Register'>
            <Form onSubmit={handleSubmit}/>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={cfmPassword}
                        onChange={(e) => setCfmPassword(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="submit" onClick = {handleSubmit} disabled={!validateForm()} >
                    Sign Up
                </Button>
        </div>
    )
}

export default withRouter(Signup);
