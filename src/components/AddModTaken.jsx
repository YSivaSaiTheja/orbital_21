import { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
  
const AddModTaken = ({ onAdd, onDelete, module }) => {
    const [mod, setMod] = useState('')
    const [grade, setGrade] = useState('')
    
    const addMod = e => {
        e.preventDefault()

        onAdd({ mod, grade })
    }

    return (
        <form onSubmit={addMod}>
            <Row>
                <Col>
                    <Form.Label>Module</Form.Label>
                    <Form.Control type="text" placeholder="BT1101" onChange={e => setMod(e.target.value)} value={mod}/>
                </Col>
                <Col>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control as='select' defaultValue='A' onChange={e => setGrade(e.target.value)} value={grade}>
                        <option value='a+'>A+</option>
                        <option value="a">A</option>    
                        <option value="a-">A-</option>
                        <option value="b+">B+</option>
                        <option value="b">B</option>
                        <option value="b-">B-</option>
                        <option value="c+">C+</option>
                        <option value="c">C</option>
                        <option value="c-">C-</option>
                        <option value='s/u'>S/U</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit' onCLick={onAdd} variant='success'>Add</Button> 
                    <h3><FaTimes style={{ color: 'red', cursor:'pointer' }} 
                onClick={() => onDelete(module.id)}/></h3>
                </Col>
            </Row>
        </form>
    )
}

export default AddModTaken