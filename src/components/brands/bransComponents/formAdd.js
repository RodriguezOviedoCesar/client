import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { createBrands } from "../../../Services/brandService";
import { Modal, Button } from "react-bootstrap";

const FormAddBrands = () => {
  const add = "Marcas";
  const [brands, setBrands] = useState({
    name: "",
  });

  const handleChangle = (event) => {
    setBrands({
      ...brands,
      [event.target.name]: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createBrands(brands).then((response) => {
      const data = response.data;
      const status = response.status;
      return { data, status };
    });

    if (h.status === 200) {
      setResponse(true);
      setMessageTrue("Marca creada correctamente");
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setBrands({
      name: "",
    });
  };
  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = () => navigate("/brands");

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>{add}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/inicio">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to={"/brands"}>{add}</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">{add}</h3>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Nombre Marca</label>
                        <input
                          onChange={handleChangle}
                          value={brands.name}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Ingrese nombre"
                        ></input>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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
    </>
  );
};

export default FormAddBrands;
