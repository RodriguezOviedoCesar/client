import { Link } from "react-router-dom";
import { delSupplier } from "../../Services/supplierService";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const SuppliersTables = ({ obj }) => {
  const handleDelete = async (event) => {
 
    await delSupplier(obj._id).then((response) => {
      if(response.status === 200){
        window.alert(response.data.message);
        window.location.reload();
      }
    });
    setShow(false);
  };

  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <tr key={obj.id}>
        <td>{obj.name}</td>
        <td>{obj.ruc}</td>
        <td>{obj.phone}</td>
        <td>{obj.adress}</td>
        <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "5px" }}>
              <button onClick={handleShow} className="btn btn-outline-danger">
                Eliminar
              </button>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Link to={`/suppliers/edit/${obj._id}`}>
                <button className="btn btn-outline-warning">Editar</button>
              </Link>
            </div>
          </div>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seguro que quieres eliminar al proovedor?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuppliersTables;
