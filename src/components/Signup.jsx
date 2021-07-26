import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Button } from 'react-bootstrap'

  
const Signup = () => {
    // Taking care of states of input fields
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmPassword, setCfmPassword] = useState('')

    // Function to validate form 
    const validateForm = () => {
        if (!email || !password || !cfmPassword) {
            alert('Please enter all your details')
        }
        return password === cfmPassword
    }

    // Function to handle the submit event 
    const handleSubmit = (e) => {
        e.preventDefault()
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
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={cfmPassword}
                        onChange={(e) => setCfmPassword(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Sign Up
                </Button>
        </div>
    )
}

export default Signup;