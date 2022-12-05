import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { getOrderByCodigo } from "../../../Services/oderService";
import OrderList from "../orderListView";

const OrderListDescription = () => {

  const {codigo} = useParams();
  const[order, setOrder] = useState([]);
  const getOrder = async () => {
    const responseOrder = await getOrderByCodigo(codigo);
     setOrder(responseOrder.data)
  }

  console.log(order)

  useEffect(()=>{
    getOrder();
  },[]);

  const id = `${order._id}`
  /*const navigate = useNavigate();
  navigate(`/vendedor/ordercomp/${id}`)*/

  return <OrderList obj={id}/>
}

export default OrderListDescription;