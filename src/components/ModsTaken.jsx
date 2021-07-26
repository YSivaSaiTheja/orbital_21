import AddModTaken from "./AddModTaken"
import { ListGroup } from "react-bootstrap"
import { Collapse, Button } from "react-bootstrap"
import { useState } from "react"

const ModsTaken = ({ modList, onAdd, onDelete, sems }) => {
    const [open, setOpen] = useState(false)

    const renderList = (modList) => {
        for (let module in modList) {
            return <ListGroup.Item>{module.mod}</ListGroup.Item>
        }
    }

    return (
        <div>
            <Button type='button' onClick={() => setOpen(!open)} aria-expanded={open} aria-controls='addMods' className='mt-1' variant='success'>Add Taken Mods</Button>
            <Collapse in={open}>
                <div id='addMods'>
                    {modList.map((mod) => (
                    <AddModTaken key={mod.id} module={mod} onAdd={onAdd} onDelete={onDelete}/>
                    ))}
                </div>
            </Collapse>
            <div>
                <ListGroup>
                    {renderList}
                </ListGroup>
            </div>
        </div>
    )
}

export default ModsTaken