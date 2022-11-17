import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

function Menu(){
    return (
        <>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='matter'><img src='./Logo.png' width='100'/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='matter' >Materias</Nav.Link>
                        <Nav.Link as={Link} to='activities'>Actividades</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section>
                <Outlet></Outlet>
            </section>
        </>
        
    )
}

export default Menu;