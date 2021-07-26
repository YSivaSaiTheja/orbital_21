import { useState } from 'react'
import { Form }  from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'

const NumSemsSlider = ({ setSem }) => {
    const [val, setVal] = useState()

    const handleChange = e => {
      e.preventDefault()

      setVal(e.target.value)
      setSem(e.target.value)
    }

    return (
        <div>
          <Form.Group as={Form.Row} controlID='numSems'>
          <p><span>
            <Form.Label column sm="6">No. of Completed Sems</Form.Label>
            <RangeSlider
              onChange={handleChange}
              min='0'
              max='8'/>
            {val}</span></p>
          </Form.Group>
        </div>
    )
}

export default NumSemsSlider