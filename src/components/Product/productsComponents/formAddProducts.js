import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createProduct } from "../../../Services/productService";
import { Link, useNavigate } from "react-router-dom";
import { getAllBrands } from "../../../Services/brandService";
import { getAllCategory } from "../../../Services/categoryService";

const FormAddProducts = () => {
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    const responseBrands = await getAllBrands();
    setBrands(responseBrands.data);
  }

  const [category, setCategory] = useState([]);

  async function getCategoty() {
    const reponseCategory = await getAllCategory();
    setCategory(reponseCategory.data);
  }

  useEffect(() => {
    getBrands();
    getCategoty();
  }, []);

  const add = "Agregar productos";
  const [products, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    status: "",
    statusFraccion: "",
    statusIgv: "",
    fraccion: "",
    precio_compra: "",
    precio_unidad: "",
    precio_fraccion: "",
    composicion: "",
    presentacion: "",
    forma_farm: "",
    codigo_barras: "",
  });

  const handleChangle = (event) => {
    setProduct({
      ...products,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createProduct(products).then((response) => {
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

    setProduct({
      name: "",
      brand: "",
      category: "",
      status: "",
      statusFraccion: "",
      statusIgv: "",
      fraccion: "",
      precio_compra: "",
      precio_unidad: "",
      precio_fraccion: "",
      composicion: "",
      presentacion: "",
      forma_farm: "",
      codigo_barras: "",
    });
  };

  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = () => navigate("/products");

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
                    <Link to={"/products"}>Productos</Link>
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
                    <h3 className="card-title">{add} </h3>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Nombre Producto</label>
                        <input
                          onChange={handleChangle}
                          value={products.name}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Ingrese nombre"
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Marca</label>
                        <select
                          name="brand"
                          className="form-control"
                          onChange={handleChangle}
                        >
                          <option selected="true" disabled="disabled">
                            Selecionar Opcion
                          </option>
                          {brands.map((bra) => (
                            <option key={bra._id} value={bra._id}>
                              {bra.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Categoria</label>
                        <select
                          name="category"
                          className="form-control"
                          onChange={handleChangle}
                        >
                          <option selected="true" disabled="disabled">
                            Selecionar Opcion
                          </option>
                          {category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Estado producto</label>
                        <select
                          name="status"
                          className="form-control"
                          onChange={handleChangle}
                          placeholder="Elija"
                        >
                          <option selected="true" disabled="disabled">
                            Selecionar Opcion
                          </option>
                          <option value={true}>ACTIVO</option>
                          <option value={false}>INACTIVO</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Fraccionable</label>
                        <select
                          name="statusFraccion"
                          className="form-control"
                          onChange={handleChangle}
                        >
                          <option selected="true" disabled="disabled">
                            Selecionar Opcion
                          </option>
                          <option value={true}>FRACCIONABLE</option>
                          <option value={false}>NO FRACCIONABLE</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Paga IGV</label>
                        <select
                          name="statusIgv"
                          className="form-control"
                          onChange={handleChangle}
                        >
                          <option selected="true" disabled="disabled">
                            Selecionar Opcion
                          </option>
                          <option value={true}>SI</option>
                          <option value={false}>NO</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Fraccion </label>
                        <input
                          disabled={products.statusFraccion !== "true"}
                          onChange={handleChangle}
                          value={products.fraccion}
                          name="fraccion"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese fraccion del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Precio compra</label>
                        <input
                          onChange={handleChangle}
                          value={products.precio_compra}
                          name="precio_compra"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese precio compra del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Precio Unidad</label>
                        <input
                          onChange={handleChangle}
                          value={products.precio_unidad}
                          name="precio_unidad"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese precio por unidad del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Precio Fraccion</label>
                        <input
                          disabled={products.statusFraccion !== "true"}
                          onChange={handleChangle}
                          value={products.precio_fraccion}
                          name="precio_fraccion"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese precio de fraccion del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Composicion</label>
                        <input
                          onChange={handleChangle}
                          value={products.composicion}
                          name="composicion"
                          type="text"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese la composicion del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Presentacion</label>
                        <input
                          onChange={handleChangle}
                          value={products.presentacion}
                          name="presentacion"
                          type="text"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese la presentacion del producto..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Forma farmaceutica</label>
                        <input
                          onChange={handleChangle}
                          value={products.forma_farm}
                          name="forma_farm"
                          type="text"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese su forma farmaceutica..."
                        ></input>
                      </div>

                      <div className="form-group">
                        <label>Codigo</label>
                        <input
                          onChange={handleChangle}
                          value={products.codigo_barras}
                          name="codigo_barras"
                          type="text"
                          min="0"
                          className="form-control"
                          placeholder="Ingrese codigo del producto..."
                        ></input>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Crear
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

export default FormAddProducts;
