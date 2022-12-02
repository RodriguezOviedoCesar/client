import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated, logOut } from "../../Services/authService";

const VendedorHeader = () => {
  const user = isAuthenticated();
  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to='/vendedor' style={{textDecoration:'none'}}>Ventas</Link>
        </Navbar.Brand>
       
        <Navbar.Collapse className="justify-content-end">
          <Nav >
            <Nav.Link >{user.username}</Nav.Link>
            <Nav.Link >{user.type}</Nav.Link>
            <NavDropdown  title="Log Out">
              <NavDropdown.Item onClick={logOut} >Cerrar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default VendedorHeader;
