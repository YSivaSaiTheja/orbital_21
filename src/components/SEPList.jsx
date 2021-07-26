import AddSEP from './AddSEP' 
import { useState } from 'react'
import { Collapse, Button } from 'react-bootstrap'

const SEPList = ({ sepList, addSEPMod, deleteSEPMod }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='mt-1'>
            <Button type='button' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls='addSEP' variant='success'>Add SEP</Button>
            <Collapse in={open}>
                <div id='addSEP'>
                    {sepList.map((sepMod) => 
                    <AddSEP key={sepMod.id} sepMod={sepMod} onAdd={addSEPMod} onDelete={deleteSEPMod}/>)}
                </div>
            </Collapse>
        </div>
    )
}

export default SEPList