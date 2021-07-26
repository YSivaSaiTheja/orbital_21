import React, { useEffect, useState } from 'react'
import { Dropdown, Row, Col } from 'react-bootstrap'

const Plan = ({ result_obj }) => {
    // State variable for the plan 
    const [plan, setPlan] = useState([
        {
            'sem' : 0, 
            'modules' : []
        }
    ])

    // Fetching the data 
    useEffect(() => {
        fetch('/plan').then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setPlan(jsonRes))
    })

    // Apply map to render components for each object
    return (
        plan.map((obj) => {
            return (
                <div>
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='mb-5'>
                                    {obj.sem}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        obj.modules.map((module) => {
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