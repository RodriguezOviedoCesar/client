import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const SideNavbarVendedor = () => {
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
              <Link to="/vendedor" className="nav-link">
                <FontAwesomeIcon icon={solid("gauge")} />
                <p style={{ marginLeft: "5px" }}>Ventas</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavbarVendedor;
