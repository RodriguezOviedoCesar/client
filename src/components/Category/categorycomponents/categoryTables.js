import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { dellCategory } from "../../../Services/categoryService";
const CategoryTables = ({ obj }) => {

  const handleDelete = async (event) =>{
    const h = await dellCategory(obj._id).then((response)=>{
      if(response.status === 200){
        const data = response.data;
        const status = response.status;
        return {data, status};
      }
    });    

    setShow(false)
    
    if(h.status === 200){
      setResponse(true);
      setMessageTrue(h.data.message)
    }else{
      setErrors(true)
      setFail(h.data.message)
    }
  }


  const [message, setMessageTrue] = useState([])
  const [fail, setFail] = useState([])
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = ()=> window.location.reload();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <tr key={obj.id}>
        <td>{obj.name}</td>
        <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "5px" }}>
              <button onClick={handleShow} className="btn btn-outline-danger">
                Eliminar
              </button>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Link to={`/category/edit/${obj._id}`}>
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
        <Modal.Body>Seguro quiere eliminar la categoria {obj.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar    return h;
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

export default CategoryTables;
