import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../Services/productService';


const ProductTable = ({ obj }) => {


  const handleDelete = async (event) =>{
    event.preventDefault();
    const h = await deleteProduct(obj._id).then((response)=>{
      const data = response.data;
      const status = response.status;
      return {data, status};
    });

    setShow(false);

    if(h.status === 200){
      setResponse(true);
      setMessageTrue(h.data.message);
    }else{
      setErrors(true);
      setFail(h.data.message);
    }
  }

  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = () => window.location.reload();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <tr key={obj.id}>
        <td>{obj.name}</td>
        <td>{obj.codigo_barras}</td>
        <td>{obj.composicion}</td>
        <td>{obj.category.name}</td>
        <td>{obj.brand.name}</td>
        <td>{obj.forma_farm}</td>
        <td>{obj.presentacion}</td>
        {obj.statusIgv === true ? <td>Paga IGV</td>:<td>No paga IGV</td>}
        {obj.status === true ? <td>Activo</td>:<td>Inactivo</td> }
        {obj.statusFraccion === true ? <td>Si</td>:<td>No</td>}
        <td>{obj.precio_compra}</td>
        <td>{obj.precio_unidad}</td>
        {obj.precio_fraccion === null ? <td>0</td>:<td>{obj.precio_fraccion}</td>}
        <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "5px" }}>
              <button onClick={handleShow} className="btn btn-outline-danger">
                Eliminar
              </button>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Link to={`/products/edit/${obj._id}`}>
                <button className="btn btn-outline-warning">Editar</button>
              </Link>
            </div>
          </div>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seguro quiere eliminar el producto {obj.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

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

export default ProductTable;
