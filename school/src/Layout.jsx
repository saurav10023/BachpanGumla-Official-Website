import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Scrollup";
import ScrollToHash from "./components/common/ScrollToHash";
function Layout(){
    return (
        <>
        <ScrollToTop/>
        <ScrollToHash/>
        <Header/>
        <Outlet/>
        <Footer/>
        </>

    )
};

export default Layout ;