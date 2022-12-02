import { useEffect, useState } from "react";
import { getUserAll } from "../../../Services/userService";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import UserTables from "./userTables";

const UserAllView = () => {
  const [users, setUser] = useState([]);
  const [tableUsers, setTableUsers] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  async function getUser() {
    const responseUser = await getUserAll();
    setUser(responseUser.data);
    setTableUsers(responseUser.data);
  }

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filtrar(event.target.value);
  };

  const filtrar = (termibus) => {
    const result = tableUsers.filter((element) => {
      if (
        element.email
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.username
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.firstname
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.direction
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.phone
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.type
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.status
          .toString()
          .toLowerCase()
          .includes(termibus.toLowerCase()) ||
        element.dni.toString().toLowerCase().includes(termibus.toLowerCase())
      ) {
        return element;
      }
    });
    setUser(result);
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

  const num = users.length;
  //fin de paginacion

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Usuarios</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/inicio">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Usuarios</li>
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
                  <h3 className="card-title">Usuarios</h3>
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
                        <th>DNI</th>
                        <th>CARGO</th>
                        <th>CORRERO</th>
                        <th>USERNAME</th>
                        <th>ESTADO</th>
                        <th>NOMBRE</th>
                        <th>DIRECCI&Oacute;N</th>
                        <th>TELEFONO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user) => (
                          <UserTables obj={user} />
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>DNI</th>
                        <th>CARGO</th>
                        <th>CORRERO</th>
                        <th>USERNAME</th>
                        <th>ESTADO</th>
                        <th>NOMBRE</th>
                        <th>DIRECCI&Oacute;N</th>
                        <th>TELEFONO</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Link to="/user/create" className="btn bg-info m-2 mt-4">
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

export default UserAllView;
