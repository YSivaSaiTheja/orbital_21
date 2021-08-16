import React, { useLocation } from 'react-router-dom'
import { Dropdown, Row, Col } from 'react-bootstrap'

const Plan = () => {
    const location = useLocation()
    const plan = location.state


    // Apply map to render components for each object
    return (
        plan.state.map((obj) => {
            return (
                <div>
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='mb-5'>
                                    {obj.semester}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        obj.modsToTake.map((module) => {
                                            return (
                                                <Dropdown.Item>{module}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            )
        })
    )
}

export default Plan
