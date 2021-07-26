import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import MajorSelect from './MajorSelect'
import NumSemsSlider from './NumSemsSlider'
import ModsTaken from './ModsTaken'
import { useState } from 'react'
import ProgramList from './ProgramList'
import SEPList from './SEPList'
import IIPList from './IIPList'
import axios from 'axios';

const Inputs = () => {
    // State variable to keep track of major
    const [major, setMajor] = useState('')

    const [modList, setModList] = useState([
        {
            id: 1, 
            mod: 'Dummy (Please delete)', 
            grade: 'A'
        }
    ])

    // State to keep track of list of programs
    const [progList, setProgList] = useState([
        {
            id: 2,
            progName: 'Dummy (Please delete)', 
            semester: 1
        }
    ])

    // State to keep track of the list of SEP mods to take
    const [sepList, setSEPList] = useState([
        {
            id: 3, 
            modName: 'Dummy (Please delete)'
        }
    ])

    // State to keep track of the list of IIP mods to take
    const [iipList, setIIPList] = useState([
        {
            id: 4, 
            modName: 'Dummy (Please delete)'
        }
    ])

    // Control state of how many mods to be added
    const [sems, setSem] = useState(0)

    // Function to add a new module 
    const addMod = (modData) => {
        const id = Math.floor(Math.random() * 100) + 1
        const newMod = {id, ...modData}
        setModList([...modList, newMod])
    } 

    // Function to remove a module
    const deleteMod = (id) => {
        setModList(modList.filter((mod) => (
            mod.id !== id
        )))
    }

    // Function to add program, note to take care of semester data as well 
    const addProg = prog => {
        const id = Math.floor(Math.random() * 100) + 1
        const newProg = {id, ...prog}
        setProgList([...progList, newProg])
    }

    // Function to remove program
    const deleteProg = (id) => {
        setProgList(progList.filter(prog => (
            prog.id !== id
        )))
    }

    // Function to add SEP module 
    const addSEPMod = (sepMod) => {
        const id = Math.floor(Math.random() * 100) + 1
        const newSEP = {id, ...sepMod}
        setSEPList([...sepList, newSEP])
    }

    // Function to remove SEP module
    const deleteSEPMod = (id) => {
        setSEPList(sepList.filter(sepMod => (
            sepMod.id !== id
        )))
    }

    // Function to add an IIP module
    const addIIPMod = (iipMod) => {
        const id = Math.floor(Math.random() * 100) + 1
        const newIIP = {id, ...iipMod}
        setIIPList([...iipList, newIIP])
    }

    // Function to remove IIP module
    const deleteIIPMod = (id) => {
        setIIPList(iipList.filter(iipMod => (
            iipMod.id !== id
        )))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const allModData = {
            major: major,
            sems : sems,
            takenList : modList, 
            progList : progList, 
            sepList : sepList,
            iipList : iipList
        }

        axios.get('http://localhost:3001/plan', allModData)
    }

    return (
        <div>
            <Card className='text-center mt-5' border='success'>
                <Card.Header >Enter the following inputs</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col><MajorSelect setMajor={setMajor}/></Col>
                            <Col><NumSemsSlider setSem={setSem}/></Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col><ModsTaken modList={modList} onAdd={addMod} onDelete={deleteMod}/></Col>
                            <Col><ProgramList progList={progList} onAdd={addProg} onDelete={deleteProg}/></Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col><SEPList sepList={sepList} addSEPMod={addSEPMod} deleteSEPMod={deleteSEPMod} /></Col>
                            <Col><IIPList iipList={iipList} addIIPMod={addIIPMod} deleteIIPMod={deleteIIPMod} /></Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={handleClick} variant='success'>Generate Plan</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Inputs