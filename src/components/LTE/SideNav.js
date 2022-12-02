import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const SideNavbar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-3">
      <Link
        to="/inicio"
        className="brand-link"
        style={{ textDecoration: "none" }}
      >
        <span className="brand-text font-weight-light">Name</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/control" className="nav-link">
                <FontAwesomeIcon icon={solid("gauge")} />
                <p style={{ marginLeft: "5px" }}>Control</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/products" className="nav-link">
                <FontAwesomeIcon icon={solid("podcast")} />
                <p style={{ marginLeft: "5px" }}>Productos</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/brands" className="nav-link">
                <FontAwesomeIcon icon={solid("copyright")} />
                <p style={{ marginLeft: "5px" }}>Marcas</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/category" className="nav-link">
                <FontAwesomeIcon icon={solid("pump-medical")} />
                <p style={{ marginLeft: "5px" }}>Categorias</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/user" className="nav-link">
                <FontAwesomeIcon icon={solid("user")} />
                <p style={{ marginLeft: "5px" }}>Usuarios</p>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <Link to="/suppliers" className="nav-link">
                <FontAwesomeIcon icon={solid("truck-fast")} />
                <p style={{ marginLeft: "5px" }}>Proovedores</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavbar;
