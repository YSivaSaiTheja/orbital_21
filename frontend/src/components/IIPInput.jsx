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
                        <option value='IS2101'>IS2101</option>
                        <option value='CS2101'>CS2101</option>
                        <option value='IS1105'>IS1105</option>
                        <option value='IS3101'>IS3101</option>
                        <option value='IS3103'>IS3103</option>
                        <option value='IS2103'>IS2103</option>
                        <option value='CS2107'>CS2107</option>
                        <option value='BT2101'>BT2101</option>
                        <option value='BT2102'>BT2101</option>
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
