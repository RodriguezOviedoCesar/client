import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../Services/userService";
import { Modal, Button} from "react-bootstrap";
const UserAddForm = () => {
  const [user, setUser] = useState({
    dni: "",
    type: "",
    email: "",
    username: "",
    status: "",
    firstname: "",
    lastname: "",
    direction: "",
    birthdate: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createUser(user).then((response) => {
      const data = response.data;
      const status = response.status;
      return { data, status };
    });

    if (h.status === 200) {
      setResponse(true);
      setMessageTrue("Usuario creada correctamente");
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setUser({
      dni: "",
      type: "",
      email: "",
      username: "",
      status: "",
      firstname: "",
      lastname: "",
      direction: "",
      birthdate: "",
      phone: "",
      password: "",
    });
  };

  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = () => navigate("/user");

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Crear Usuarios</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/inicio" style={{ textDecoration: "none" }}>
                    Inicio
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="/user">Usuarios</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Registrar Usuarios</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label>DNI</label>
                      <input
                        onChange={handleChange}
                        value={user.dni}
                        name="dni"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese DNI"
                        maxLength={8}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Cargo</label>
                      <select
                        onChange={handleChange}
                        defaultChecked={user.type}
                        name="type"
                        className="form-control"
                      >
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        <option value="VENDEDOR" selected>
                          VENDEDOR
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Correo</label>
                      <input
                        onChange={handleChange}
                        value={user.email}
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Ingrese su correo"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Nombre Usuario</label>
                      <input
                        onChange={handleChange}
                        value={user.username}
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese nombre usuario"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select
                        value={user.status}
                        onChange={handleChange}
                        name="status"
                        className="form-control"
                      >
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        onChange={handleChange}
                        value={user.firstname}
                        name="firstname"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese nombre"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Apellido</label>
                      <input
                        onChange={handleChange}
                        value={user.lastname}
                        name="lastname"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese nombre"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Direcci&oacute;n</label>
                      <input
                        onChange={handleChange}
                        value={user.direction}
                        name="direction"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese nombre"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Nacimiento</label>
                      <input
                        onChange={handleChange}
                        value={user.birthdate}
                        name="birthdate"
                        type="date"
                        className="form-control"
                        placeholder="Ingrese RUC"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Telefono</label>
                      <input
                        onChange={handleChange}
                        value={user.phone}
                        name="phone"
                        type="tel"
                        className="form-control"
                        placeholder="Ingrese Telefono"
                        maxLength={9}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Contraseña</label>
                      <input
                        onChange={handleChange}
                        value={user.password}
                        name="password"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese direcciòn"
                      ></input>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button onClick={handleSubmit} className="btn btn-primary">
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={response} onHide={handleCloseResponse}>
        <Modal.Header closeButton>
          <Modal.Title>Correcto</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReaload}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={errors} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{fail}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseError}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserAddForm;
