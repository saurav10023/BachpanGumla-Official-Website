import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Scrollup";
function Layout(){
    return (
        <>
        <ScrollToTop/>
        <Header/>
        <Outlet/>
        <Footer/>
        </>

    )
};

export default Layout ;