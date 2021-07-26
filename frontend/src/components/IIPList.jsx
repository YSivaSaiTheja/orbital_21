import IIPInput from './IIPInput'
import { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap'

const IIPList = ({ iipList, addIIPMod, deleteIIPMod }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='mt-1'>
            <Button type='button' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls='addIIP' variant='success'>Add IIP Mod</Button>
            <Collapse in={open}>
                <div id='addIIP'>
                    {iipList.map((iipMod) => 
                    <IIPInput key={iipMod.id} iipMod={iipMod} onAdd={addIIPMod} onDelete={deleteIIPMod}/>)}
                </div>
            </Collapse>
        </div>
    )
}

export default IIPList;