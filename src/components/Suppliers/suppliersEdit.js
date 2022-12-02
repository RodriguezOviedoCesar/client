import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editSuppliers, getSupplierById } from "../../Services/supplierService";
const SuppliersEditCom = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [suppliers, setSuppliers] = useState({
    name: "",
    ruc: "",
    phone: "",
    adress: ""
  })

  useEffect(() => {
    getSupplierById(id)
      .then(response => setSuppliers(response.data))
      .catch(error => console.error(error));
  }, [])

  const handleChange = (event) => {
    setSuppliers({
      ...suppliers,
      [event.target.name]: event.target.value.toUpperCase()
      
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editSuppliers(suppliers, id).then((response)=>{
      if(response.status === 200){
        window.alert('Registros modificados correctamente');
        navigate('/suppliers')
      }
    });
    setSuppliers({
      name: "",
      ruc: "",
      phone: "",
      adress: ""
    })

  }

  return (
    <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Proovedores</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><Link to='/inicio'>Inicio</Link></li>
              <li className="breadcrumb-item active"><Link to={'/suppliers'}>Proveedores</Link></li>
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
              <h3 className="card-title">Modificar proovedor rucº: {suppliers.ruc}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label>Nombre</label>
                  <input onChange={handleChange} value={suppliers.name} name="name" type="text" className="form-control"  placeholder="Ingrese nombre"></input>
                </div>
                <div className="form-group">
                  <label>RUC</label>
                  <input onChange={handleChange} value={suppliers.ruc} name="ruc" type="text" className="form-control" maxLength={11} placeholder="Ingrese RUC"></input>
                </div>
                <div className="form-group">
                  <label>Telefono</label>
                  <input onChange={handleChange} value={suppliers.phone} name="phone" type="text" className="form-control" maxLength={9} placeholder="Ingrese Telefono"></input>
                </div>
                <div className="form-group">
                  <label>Direcciòn</label>
                  <input onChange={handleChange} value={suppliers.adress} name="adress" type="text" className="form-control"  placeholder="Ingrese direcciòn"></input>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>


      </div>
    </div>

  </div>
</section>
    
    
  </div>
  )
}

export default SuppliersEditCom;