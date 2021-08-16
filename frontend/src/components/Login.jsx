import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
// import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../constants/api';
import axios from 'axios';
import { withRouter } from "react-router-dom";

const Login = (props) => {
    // Taking care of states of input fields (NUSNET data)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)


    // Function to handle the submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload={
            "email": email,
            "password": password,
        }
        axios.post('http://localhost:3001/user/login', payload)
            .then((response) => {
                try {
                    if (response.data.validCredentials === true) {
                        redirectToHome();
                        console.log(response.data)
                    } else {
                        console.log("Wrong username/password");
                    }
                } catch (error) {
                    console.log(error.message)
                };
            })
        }

    const redirectToHome = () => {
        props.history.push('/');
    }

    const redirectToRegister = () => {
        props.history.push('/register');
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className='login'>
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
                <Form.Group controlId="rmbMe" size='lg'>
                    <Form.Check type="checkbox" label="Remember Me" value={rememberMe} checked={rememberMe}
                    onChange={(e) => setRememberMe(e.currentTarget.checked)} />
                </Form.Group>
                <Button variant="link" onClick={() => redirectToRegister()}>Don't have an account?</Button>
                <Button block size="lg" type="submit" onClick = {handleSubmit} disabled={!validateForm()}>
                    login
                </Button>
        </div>
    )
}

export default withRouter(Login);

