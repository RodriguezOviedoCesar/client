import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/LTE/Header";
import SideNavbarVendedor from "../../components/LTE/SideNavVendedor";
import { getAllOrderListByOrder } from "../../Services/orderListService";

const OrderList = () => {
  const navigate = useNavigate();
  const { codigo } = useParams();
  const [list, setList] = useState([]);

  console.log(codigo);

  const getList = async () => {
    const responseOrderList = await getAllOrderListByOrder(codigo);
    setList(responseOrderList.data);
  };

  const handleChange = async () => {
    navigate(`/vendedor/add/${codigo}`);
  };

  let c = 0
  let b = c;

  useEffect(() => {
    getList();
  }, []);

  console.log(list);
  return (
    <>
      <Header/>
      <SideNavbarVendedor/>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Ventas</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/vendedor">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Ventas</li>
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
                  <h3 className="card-title">Ventas</h3>
                </div>
                <div className="card-body">
                  <div
                    className="ContainerInput"
                    style={{ marginBottom: "15px" }}
                  >
                    <input
                      className="form-control inputBuscar"
                      placeholder="Buscar"
                    />
                  </div>
                  <table
                    id="table1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Codigo Venta</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Unidades Vendidas</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((pro) => (
                        <tr key={pro.id}>
                          <td>{pro.sale.codigo}</td>
                          <td>{pro.product.name}</td>
                          <td>{pro.price}</td>
                          <td>{pro.units}</td>
                          <td>{pro.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Codigo Venta</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Unidades Vendidas</th>
                        {list.map(pro=> { b =  c += pro.totalPrice })}
                        <th>{b}</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button className="btn bg-info m-4 mt-5" onClick={handleChange}>
                      Registrar ventas
                    </button>
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

export default OrderList;
