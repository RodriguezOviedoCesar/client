import React from "react";
import CreateOrder from "../components/order/createOrder";
import VendedorHeader from "./vendedor/HeaderVendeor";
class VendedorView extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <VendedorHeader />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            alignContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "whitesmoke",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "15px",
              height: "55px",
              width: "95%",
              marginBottom: "35px",
              padding: "25px",
            }}
          >
            <p style={{ fontSize: "35px" }}>Ventas</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            alignContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "15px",
              height: "55px",
              width: "95%",
              marginBottom: "35px",
              padding: "25px",
            }}
          >
            <CreateOrder/>
          </div>
        </div>
      </div>
    );
  }
}

export default VendedorView;
