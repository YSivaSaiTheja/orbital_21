import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Button } from 'react-bootstrap'

  
const Login = () => {
    // Taking care of states of input fields (NUSNET data)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    // Function to validate form 
    const validateForm = () => {
        if (!email || !password) {
            console.log('Enter Deets')
        }
        return // Check carried out here to see if user exists in database
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
                <Form.Group controlId="rmbMe" size='lg'>
                    <Form.Check type="checkbox" label="Remember Me" value={rememberMe} checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.currentTarget.checked)} />
                 </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
        </div>
    )
}

export default Login;