import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { CreateSuppliers } from "../../Services/supplierService";
import Header from "../LTE/Header";
import SideNavbar from "../LTE/SideNav";

const SuppliersAdd = () => {
  const add = "Agregar Proveedor";
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState({
    name: "",
    ruc: "",
    phone: "",
    adress: "",
  });

  const handleChangle = (event) => {
    setSuppliers({
      ...suppliers,
      [event.target.name]: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*console.log(suppliers)*/
    await CreateSuppliers(suppliers).then((response) => {
      if (response.status !== 200) {
        window.alert("No se puedo agregar al cliente");
      } else {
        navigate("/suppliers");
      }
    });
    //Todo: use navigate hook
    //navigate('/suppliers')
    setSuppliers({
      name: "",
      ruc: "",
      phone: "",
      adress: "",
    });
  };

  return (
    <>
      <Header />
      <SideNavbar />
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
                    <Link to={"/suppliers"}>Proveedores</Link>
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
                        <label>Nombre</label>
                        <input
                          onChange={handleChangle}
                          value={suppliers.name}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Ingrese nombre"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label>RUC</label>
                        <input
                          onChange={handleChangle}
                          value={suppliers.ruc}
                          name="ruc"
                          type="text"
                          className="form-control"
                          maxLength={11}
                          placeholder="Ingrese RUC"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label>Telefono</label>
                        <input
                          onChange={handleChangle}
                          value={suppliers.phone}
                          name="phone"
                          type="text"
                          className="form-control"
                          maxLength={9}
                          placeholder="Ingrese Telefono"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label>Direcciòn</label>
                        <input
                          onChange={handleChangle}
                          value={suppliers.adress}
                          name="adress"
                          type="text"
                          className="form-control"
                          placeholder="Ingrese direcciòn"
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
    </>
  );
};

export default SuppliersAdd;
