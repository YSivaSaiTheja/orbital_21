import { useState } from "react"
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

const AddSEP = ({ sepMod, onAdd, onDelete }) => {
    // State variable to control state of SEP module input 
    const [sepModule, setSEPMod] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()

        onAdd(sepModule)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Label>SEP Mod</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="sep_mod"></InputGroup.Text>
                        <FormControl
                        onChange={e => setSEPMod(e.target.value)}
                        value={sepModule}
                        placeholder="Module"
                        aria-label="Username"
                        aria-describedby="sep_mod"
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <Button type='submit' variant='success'>Add</Button>
                    <h3><FaTimes style={{ color: 'red', cursor:'pointer' }} 
                onClick={() => onDelete(sepMod.id)}/></h3>
                </Col>
            </Row>
        </form>
    )
}

export default AddSEP