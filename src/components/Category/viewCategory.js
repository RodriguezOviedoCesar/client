import Header from "../LTE/Header"
import SideNavbar from "../LTE/SideNav"
import LogCategory from "./categorycomponents/logCategory";
import React from "react";

const ViewCategory = ()=>{
  return(
    <>
      <Header/>
      <SideNavbar/>
      <LogCategory/>
    </>
  )
}

export default ViewCategory;