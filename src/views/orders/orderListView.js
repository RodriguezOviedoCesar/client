import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { getOrderByCodigo } from "../../Services/oderService";
import { getAllOrderListByOrder } from "../../Services/orderListService";

const OrderList =() =>{
  const navigate = useNavigate()
  const {codigo} = useParams();
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const b = '63892e725eaf68d7ba1fa74a';

  const getList = async ()=>{
    const responseOrderList = await getAllOrderListByOrder(b)
    setList(responseOrderList.data);
  }

  const getOrder = async () => {
    const responseOrder =  await getOrderByCodigo(codigo);
    setOrder(responseOrder.data)
  }

  const handleChange = async () => {
    navigate(`/vendedor/add/${codigo}`)
  }

  useEffect(()=>{
    getOrder();
    getList();
  },[])

  console.log(list)
  console.log(order._id)
  return(
    <>
    <p>{order._id}</p>
    <div>
    {(list === null) ? <p>Registre ventas</p>:<p>ventas</p>}
    </div>
    <button onClick={handleChange}>Registrar ventas</button>
    </>
  )

}

export default OrderList;