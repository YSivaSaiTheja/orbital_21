import { useState } from "react"
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

const AddProgram = ({ onAddProg, onDelete, prog }) => {
    const [program, setProgram] = useState('')
    const [sem, setSem] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        onAddProg(program, sem)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Row> 
                <Col>
                    <Form.Label>Program</Form.Label>
                    <Form.Control as='select' placeholder='IIP' onChange={e => setProgram(e.target.value)} value={program}>
                        <option value='iip'>IIP</option>
                        <option value='sip'>SIP</option>
                        <option value='noc'>NOC</option>
                        <option value='sep'>SEP</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control as='select' placeholder='1' onChange={e => setSem(e.target.value)} value={sem}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit' variant='success'>Add</Button> 
                    <h3><FaTimes style={{ color: 'red', cursor:'pointer' }} 
                onClick={() => onDelete(prog.id)}/></h3>
                </Col>
            </Row>
        </form>
    )
}

export default AddProgram