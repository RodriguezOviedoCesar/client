import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { json, useNavigate, useParams } from "react-router";
import { createOrderList } from "../../Services/orderListService";
import { getAllProducts } from "../../Services/productService";
import { Modal, Button } from "react-bootstrap";
import { getProductLog } from "../../Services/logServices";
import { Link } from "react-router-dom";
import SideNavbarVendedor from "../../components/LTE/SideNavVendedor";
import Header from "../../components/LTE/Header";

const OrderView = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [log, setLog] = useState([]);
  const [value, setValue] = useState("");
  const [productoSelecionado, setProductoSelecionado] = useState({});
  const { codigo } = useParams();

  const getProducts = async () => {
    const reponseProduct = await getAllProducts();
    setProducts(reponseProduct.data);
    setData(reponseProduct.data);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setProducts(filtrarProdutos(value));
  };

  const filtrarProdutos = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((products) => {
      var textoCompleto =
        products.name +
        " - " +
        products.brand.name +
        " - " +
        products.category.name;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return products;
      }
    });
    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setProducts([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name} - ${suggestion.brand.name} - ${suggestion.category.name}`;
  };

  const renderSuggestion = (suggestion) => (
    <div className="sugerencia" onClick={() => seleccionarProducto(suggestion)}>
      {`${suggestion.name} - ${suggestion.brand.name} - ${suggestion.category.name}`}
    </div>
  );

  const seleccionarProducto = (producto) => {
    setProductoSelecionado(producto);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Nombre del Producto",
    value,
    onChange,
  };

  /*  const eventEnter = (e) => {
    if (e.key === "Enter") {
      var personajeActual = data.filter((p) => p.name === e.target.value.trim());

      //console.log(personajeActual);
      var personaje = {
        id: personajeActual[0].id,
        name: personajeActual[0].name,
        gender: personajeActual[0].gender,
        normalized_name: personajeActual[0].normalized_name,
      };
      seleccionarProducto(personaje);
    }
  };*/
  const c = productoSelecionado._id;
  const [valor, setValor] = useState("");
  const [valo1, setValo1] = useState("");

  const [lis, setLis] = useState({
    sale: "",
    product: "",
    units: "",
    unitsfraccion: "",
    salidaUnits: "",
    price: "",
    totalPrice: "",
  });

  const handleChangle = async (event) => {
    await setLis({
      ...lis,
      [event.target.name]: event.target.value,
    });
  };

  /*  const actu = async () => {
    await setLis({
      sale: codigo,
      product: valor,
      units: lis.units,
      unitsfraccion: lis.unitsfraccion,
      salidaUnits: lis.units,
      price: valo1,
      totalPrice: lis.units * valo1,
    });
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createOrderList(lis).then((response) => {
      const data = response.data;
      const status = response.status;
      return { data, status };
    });

    if (h.status === 200) {
      setResponse(true);
      setMessageTrue("Agregado correctamente");
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setLis({
      sale: "",
      product: "",
      units: "",
      unitsfraccion: "",
      salidaUnits: "",
      price: "",
      totalPrice: "",
    });
  };

  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = () => navigate(`/vendedor/order/${codigo}`);

  //console.log(!productoSelecionado);

  console.log(lis);

  /*useEffect(() => {
    actu();
  }, []);*/

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <SideNavbarVendedor />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Agregar Productos</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/vendedor">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Agregar Productos</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="conten">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Agregar Productos</h3>
                </div>
                <div className="card-body">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <div className="form-group">
                        <Autosuggest
                          suggestions={products}
                          onSuggestionsFetchRequested={
                            onSuggestionsFetchRequested
                          }
                          onSuggestionsClearRequested={
                            onSuggestionsClearRequested
                          }
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                          //onSuggestionSelected={eventEnter}
                        />
                      </div>
                      <div>
                      <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        setValor(productoSelecionado._id);
                        setValo1(productoSelecionado.precio_unidad);
                      }}
                    >
                      Checar Estado
                    </button>
                      </div>
                    </div>
                    <div>
                    <div className="form-group">
                    <input
                      type="hidden"
                      onChange={handleChangle}
                      value={(lis.sale = codigo)}
                      name="sale"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="hidden"
                      onChange={handleChangle}
                      value={(lis.product = productoSelecionado._id)}
                      name="product"
                    ></input>
                  </div>
                  <div>
                    <input
                      value={
                        !productoSelecionado
                          ? "Seleccione un producto"
                          : productoSelecionado.name
                      }
                      disabled
                    ></input>
                  </div>
                  <div>
                    <input
                      value={
                        !productoSelecionado.brand
                          ? "Seleccione un producto"
                          : productoSelecionado.brand.name
                      }
                      disabled
                    ></input>
                  </div>
                  <div>
                    <input
                      value={
                        !productoSelecionado.category
                          ? "Seleccione un producto"
                          : productoSelecionado.category.name
                      }
                      disabled
                    ></input>
                  </div>
                  <div>
                    <input
                      type="numer"
                      onChange={handleChangle}
                      value={lis.units}
                      name="units"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="number"
                      onChange={handleChangle}
                      value={lis.unitsfraccion}
                      name="unitsfraccion"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="numer"
                      onChange={handleChangle}
                      value={(lis.salidaUnits = lis.units)}
                      name="salidaUnits"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="hidden"
                      onChange={handleChangle}
                      value={(lis.price = productoSelecionado.precio_unidad)}
                      name="price"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="hidden"
                      onChange={handleChangle}
                      value={(lis.totalPrice = lis.units * lis.price)}
                      name="totalPrice"
                    ></input>
                  </div>
                  <div>
                    <input disabled value={lis.price}></input>
                  </div>
                  <div>
                    <input disabled value={lis.totalPrice}></input>
                  </div>
                  <div>

                    <button className="btn btn-primary " onClick={handleSubmit}>
                      Agregar pedido
                    </button>
                  </div>
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

export default OrderView;
