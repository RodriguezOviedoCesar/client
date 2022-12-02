import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { isAuthenticated, logOut } from '../../Services/authService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = () => {
  const user = isAuthenticated();
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-none d-sm-inline-block">
          {user.type === 'ADMINISTRADOR'? <Link to='/inicio' className="nav-link">Home</Link>: <Link to='/vendedor' className="nav-link">Home</Link>}
          
        </li>
      </ul>
      <ul className="navbar-nav ml-auto" style={{marginRight: '15px', marginTop:'15px'}}>
        <div style={{display: 'flex', flexDirection:'row'}} className='mr-5'>
        <FontAwesomeIcon style={{marginTop:'4px', marginRight:'5px'}} icon={solid("user")} />
            <p>Usuario: {user.username}</p>       
        </div>
        <div className='ml-5'>
          <p>Cargo: {user.type}</p>
          </div>
      </ul>
      <ul className="navbar-nav ml-auto" style={{marginRight: '15px'}}>
        <div>
            <Button onClick={logOut} className='btn btn-outline-dark bg-white mr-4'><FontAwesomeIcon icon={solid("right-from-bracket")} /></Button>       
        </div>
      </ul>
    </nav>

  );
};

export default Header;
  