import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { useNavigate, useParams } from "react-router";
import { getOrderByCodigo } from "../../Services/oderService";
import { createOrderList } from "../../Services/orderListService";
import { getAllProducts } from "../../Services/productService";
import { Modal, Button } from "bootstrap";

const OrderView = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [productoSelecionado, setProductoSelecionado] = useState({});
  const [order, setOrder] = useState([])
  const {codigo} = useParams();


  const getOrderCode = async () => {
    const responseOrder = await getOrderByCodigo(codigo);
    setOrder(responseOrder.data);
  }

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
  const [valor, setValor]= useState('')
  const [valo1, setValo1]= useState('')

  const [lis, setLis] = useState({
    sale: '',
    product: '',
    units: '',
    unitsfraccion:'',
    salidaUnits:'',
    price:'',
    totalPrice:''
  });

  const handleChangle = (event) => {
    setLis({
      ...lis,
      [event.target.name]: event.target.value
    })
  }

  const actu = async ()=> {
    await setLis({ 
      sale: order._id,
      product: valor,
      units: lis.units,
      unitsfraccion: lis.unitsfraccion,
      salidaUnits: lis.units,
      price: valo1,
      totalPrice: lis.units * valo1,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const h = await createOrderList(lis).then(response => {
      const data = response.data;
      const status = response.status;
      return {data, status}
    });

    if (h.status === 200) {
      setResponse(true);
      setMessageTrue('Agregado correctamente');
    } else {
      setErrors(true);
      setFail(h.data.message);
    }

    setLis({
      sale: '',
    product: '',
    units: '',
    unitsfraccion:'',
    salidaUnits:'',
    price:'',
    totalPrice:''

    
    })
  }

  const navigate = useNavigate();
  const [message, setMessageTrue] = useState([]);
  const [fail, setFail] = useState([]);
  const [errors, setErrors] = useState(false);
  const handleCloseError = () => setErrors(false);

  const [response, setResponse] = useState(false);
  const handleCloseResponse = () => setResponse(false);
  const handleReaload = ()=> navigate(`/vendedor/order/${codigo}`)

  console.log(lis)

  
  useEffect(() => {
    actu()
  });

  useEffect(() => {
    getProducts();
    getOrderCode();
  },[]);



  return (
    <div>
      <section>
      <input value={valor} name="product" ></input> 
      <input type="numer"  onChange={handleChangle} value={lis.units} name="units"></input>
      <input  type="number" onChange={handleChangle} value={lis.unitsfraccion} name="unitsfraccion"></input>
      <input type="numer"  onChange={handleChangle} value={lis.salidaUnits} name="salidaUnits"></input>
      <Autosuggest
        suggestions={products}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        //onSuggestionSelected={eventEnter}
      />
      <br />
      <button
        className="btn btn-primary"
        onClick={(event)=>{
          setValor(productoSelecionado._id);
          setValo1(productoSelecionado.precio_unidad);

        }}
      >
        Checar Estado
      </button>

      <button onClick={handleSubmit}>
        Agregar pedido
      </button>
      </section>
      
    </div>
  
  );
};

export default OrderView;
