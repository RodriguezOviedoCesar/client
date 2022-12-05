import { useState } from "react";
import { useNavigate } from "react-router";
import { createOrder } from "../../Services/oderService";
import { Modal, Button } from "react-bootstrap";
import { isAuthenticated } from "../../Services/authService";

const CreateOrder = () => {
  const generarCodigo = ()=>{
    const codigoGene = Math.ceil(Math.random()*99999999);
    return codigoGene;
  }

  const h = generarCodigo();
  const user = isAuthenticated()
  const [order, setOrder] = useState({
      type: "",
      efectivo: 0,
      status: 1,
      user: user._id, 
      codigo:h
    });

  const handleChange = (event) => {
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createOrder(order).then((response) => {
      const data = response.data;
      const status = response.status;
      return { data, status };
    });

    console.log(h.data.codigo);

    if (h.status === 200) {
      setResponse(true);
      setMessageTrue('Creado correctamente');
      setUrl(h.data._id)
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setOrder({
      type: "",
      efectivo:"",
      status: "",
      user: "",
    });
  };

  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [url, setUrl] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = ()=> navigate(`/vendedor/order/${url}`)

  return (
  <div style={{marginTop:'500px'}}>
      <section >
        <div >
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Crear Orden</h1>
            </div>
          </div>
        </div>
      </section>{" "}
      <section>
        <div>
          <div >
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Registrar Usuarios</h3>
                </div>
                <form>
                  <div className="card-body">
                  <div className="form-group">
                      <label>C&oacute;digo</label>
                      <input
                        disabled
                        onChange={handleChange}
                        value={order.codigo}
                        name="codigo"
                        type="text"
                        className="form-control"
                        placeholder="Codigo"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select
                        
                        onChange={handleChange}
                        name="type"
                        className="form-control"
                      >
                        <option selected="true" disabled="disabled">
                          Selecionar Opcion
                        </option>
                        <option value="BOLETA">BOLETA</option>
                        <option value="FACTURA">FACTURA</option>
                        <option value="TICKET">TICKET</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Efectivo</label>
                      <input
                        onChange={handleChange}
                        value={order.efectivo}
                        disabled
                        name="efectivo"
                        type="number"
                        miin='0'
                        className="form-control"
                        placeholder="Ingrese monto"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>User</label>
                      <input
                        disabled
                        onChange={handleChange}
                        value={user.username}
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Ingrese nombre"
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

export default CreateOrder;