import AddProgram from './AddProgram'
import { useState } from 'react'
import { Collapse, Button } from 'react-bootstrap'


const ProgramList = ({ progList, onAdd, onDelete }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='mt-1'>
            <Button type='button' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls='addProgs' variant='success'>Add Program</Button>
            <Collapse in={open}>
                <div id='addProgs'>
                    {progList.map((prog) => 
                    <AddProgram key={prog.id} prog={prog} onAddProg={onAdd} onDelete={onDelete}/>)}
                </div>
            </Collapse>
        </div>
    )
}

export default ProgramList;