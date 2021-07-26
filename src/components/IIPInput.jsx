import { useState } from "react"
import { Button, Row, Col, Form } from "react-bootstrap"
import { FaTimes } from 'react-icons/fa'

const IIPInput = ({ iipMod, onAdd, onDelete }) => {
    // State variable to keep track of iip module
    const [iipModule, setIIPMod] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        onAdd(iipModule)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col>
                <Form.Label>IIP Mod</Form.Label>
                    <Form.Control as='select' placeholder='IIP' onChange={e => setIIPMod(e.target.value)} value={iipModule}>
                        <option value='is2101'>IS2101</option>
                        <option value='cs2101'>CS2101</option>
                        <option value='is1105'>IS1105</option>
                        <option value='is3101'>IS3101</option>
                        <option value='is3103'>IS3103</option>
                        <option value='is2103'>IS2103</option>
                        <option value='cs2107'>CS2107</option>
                        <option value='bt2101'>BT2101</option>
                        <option value='bt2102'>BT2101</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button type='submit' variant='success'>Add</Button> 
                    <h3><FaTimes style={{ color: 'red', cursor:'pointer' }} 
                onClick={() => onDelete(iipMod.id)}/></h3>
                </Col>
            </Row>
        </form>
    )
}

export default IIPInput