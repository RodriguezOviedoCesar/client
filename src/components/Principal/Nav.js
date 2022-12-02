import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from'react-router-dom'

const NavHome = ()=>{
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav>
              <Link to='/' style={{textDecoration: 'none'}}>
                <div id="Home" style={{marginTopx:'5px'}}>
                
                    Inicio
                  
                </div>
              </Link>
            </Nav>
            <Nav>
              <Link to='/nostros' style={{textDecoration: 'none'}}>
                <div id="Home" style={{marginTopx:'5px'}}>
                  
                    Nostros
                  
                </div>
              </Link>
            </Nav>
            <Nav>
              <Link to='/login  ' style={{textDecoration: 'none'}}>
                <div id="Home" style={{marginTopx:'5px'}}>
                  
                   <Button>
                    Home
                   </Button>
                  
                </div>
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};


export default NavHome;