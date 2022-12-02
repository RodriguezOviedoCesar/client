import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllByIDBrands, updateBrands } from "../../../Services/brandService";
import { Modal, Button } from "react-bootstrap";

const FormEditBrands = () => {
  const add = "Modificar Marca";
  const { id } = useParams();

  const [brands, setBrands] = useState({
    name: "",
  });

  useEffect(() => {
    getAllByIDBrands(id)
      .then((response) => setBrands(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChangle = (event) => {
    setBrands({
      ...brands,
      [event.target.name]: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await updateBrands(brands, id).then((response) => {
      const data = response.data;
      const status = response.status;
      return { data, status };
    });



    if (h.status === 200) {
      setResponse(true);
      setMessageTrue("Categoria modificada correctamente");
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setBrands({
      name: ""
    });
  };


  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([])
  const [fail, setFail] = useState([])
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = ()=> navigate('/brands');

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
                    <Link to={"/brands"}>Marcas</Link>
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

export default FormEditBrands;