import { Form, Row, Col } from 'react-bootstrap'

const MajorSelect = ({ setMajor }) => {

    return (
        <Form>
            <Form.Group as={Row} controlId="major" className='mt-3'>
                <Form.Label column sm='4'>Major</Form.Label>
                <Col sm='8' className='mb-3'>
                    <Form.Control as='select' defaultValue="Business Analytics" onChange={e => setMajor(e.target.value)}>
                        <option value='bza'>Business Analytics</option>
                        <option value='cs'>Computer Science</option>
                        <option value='ceg'>Computer Engineering</option>
                        <option value='is1'>Information Systems</option>
                        <option value='is2'>Information Security</option>
                    </Form.Control>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default MajorSelect