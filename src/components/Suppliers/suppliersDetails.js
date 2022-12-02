import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { isAuthenticated } from "../../Services/authService";
import { getSupplierById } from "../../Services/supplierService";
import Header from "../LTE/Header";
import SideNavbar from "../LTE/SideNav";

const SupplierDetails = () => {
  const user = isAuthenticated();
  const [suppliers, setSuppliers] = useState({});
  const { id } = useParams();

  useEffect(()=>{
    getSupplier();
  },[]);

  const getSupplier = async () => {
    const response = await getSupplierById(id)
    setSuppliers(response.data)
  }
  return(
   <>
    <Header/>
    <SideNavbar/>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>DataTables</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">{suppliers.name}</li>
                </ol>
              </div>
            </div>  
          </div>
        </section>
      <div class="container">
        <h2>{suppliers.name}</h2>
        <h3>{suppliers.ruc}</h3>
        <h4>{suppliers.phone}</h4>
        <h5>{suppliers.adress}</h5>
      </div>
        
      {user.type === 'ADMINISTRADOR' && (
        <button class="btn btn-warning">
        Editar
      </button>
      )}
      </div>
    </>
  )
}

export default SupplierDetails;