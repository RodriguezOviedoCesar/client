import SuppliersTables from "./suppliersTables";
import Header from "../LTE/Header";
import SideNavbar from "../LTE/SideNav";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSupplierAll } from "../../Services/supplierService";
import { TablePagination } from "@mui/material";

const SupplierAllView = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [tablaUsuario, setTablaUsuario] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  async function getSuppliers() {
    const responseSuppliers = await getSupplierAll();
    setSuppliers(responseSuppliers.data);
    setTablaUsuario(responseSuppliers.data);
  }

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filtrar(event.target.value);
  };

  const filtrar = (termbus) => {
    var result = tablaUsuario.filter((element) => {
      if (
        element.name.toString().toLowerCase().includes(termbus.toLowerCase()) ||
        element.adress
          .toString()
          .toLowerCase()
          .includes(termbus.toLowerCase()) ||
        element.ruc.toString().toLowerCase().includes(termbus.toLowerCase())
      ) {
        return element;
      }
    });
    setSuppliers(result);
  };

  //Pagination

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const num = suppliers.length;
  //fin de paginacion

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      <Header />
      <SideNavbar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Proveedores</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/inicio">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Proveedores</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-12" style={{}}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Proveedores</h3>
                </div>
                <div className="card-body">
                  <div
                    className="ContainerInput"
                    style={{ marginBottom: "15px" }}
                  >
                    <input
                      className="form-control inputBuscar"
                      value={busqueda}
                      placeholder="Buscar"
                      onChange={handleChange}
                    />
                  </div>
                  <table
                    id="table1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>RUC</th>
                        <th>Telefono</th>
                        <th>Direcciòn</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((supp) => (
                          <SuppliersTables obj={supp} />
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Nombre</th>
                        <th>RUC</th>
                        <th>Telefono</th>
                        <th>Direcciòn</th>
                        <th>Acciones</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Link
                        to="/suppliers/add"
                        className="btn bg-info m-2 mt-4"
                      >
                        Agregar
                      </Link>
                    </div>
                    <div>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={num}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupplierAllView;

/*
<tbody>
                      {suppliers.map((supp) => (
                        <SuppliersTables obj={supp} />
                      ))}
                    </tbody> */
