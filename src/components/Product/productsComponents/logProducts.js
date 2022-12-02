import { useEffect, useState } from "react";
import { getAllProducts } from "../../../Services/productService";
import { Link } from "react-router-dom";
import { TablePagination } from "@mui/material";
import ProductTable from "./tablesProducts";

const   LogProduct = () => {
  const [product, setProduct] = useState([]);
  const [tableProduct, setTableProduct] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  async function getProducts() {
    const responseProduct = await getAllProducts();
    setProduct(responseProduct.data);
    setTableProduct(responseProduct.data);
  }

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filtrar(event.target.value);
  };

  const filtrar = (termbus) => {
    const result = tableProduct.filter((element) => {
      if (
        element.name.toString().toLowerCase().includes(termbus.toLowerCase())
      ) {
        return element;
      }
    });
    setProduct(result);
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

  const num = product.length;
  //fin de paginacion

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Productos</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/inicio">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Productos</li>
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
                  <h3 className="card-title">Productos</h3>
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
                        <th>Codigo</th>
                        <th>Composicion</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Forma Far.</th>
                        <th>Presentaci&oacute;n</th>
                        <th>Igv</th>
                        <th>Estado</th>
                        <th>Fraccionable</th>
                        <th>Precio Compra</th>
                        <th>Precio Uni.</th>
                        <th>Precio Fracc.</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((pro) => (
                          <ProductTable obj={pro} />
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Nombre</th>
                        <th>Codigo</th>
                        <th>Composicion</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Forma Far.</th>
                        <th>Presentaci&oacute;n</th>
                        <th>Igv</th>
                        <th>Estado</th>
                        <th>Fraccionable</th>
                        <th>Precio Compra</th>
                        <th>Precio Uni.</th>
                        <th>Precio Fracc.</th>
                        <th>Acciones</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Link to="/products/add" className="btn bg-info m-2 mt-4">
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

export default LogProduct;
