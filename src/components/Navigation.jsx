import { Navbar, NavDropdown, Nav } from "react-bootstrap"
 
const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fluid>
            <Navbar.Brand className='p-3'>Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/howtouse'>How to Use</Nav.Link>
                <Nav.Link href='/plan'>See my plan</Nav.Link>
                <NavDropdown title="Info" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="https://www.comp.nus.edu.sg/industry/intern/student/sip/">IIP / SIP</NavDropdown.Item>
                    <NavDropdown.Item href="https://enterprise.nus.edu.sg/education-programmes/nus-overseas-colleges/">NOC Info</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.comp.nus.edu.sg/programmes/ug/beyond/sep/">SEP Info</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="https://nusmods.com/timetable/sem-1">NUS Mods</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className='p-3'>
                <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;
