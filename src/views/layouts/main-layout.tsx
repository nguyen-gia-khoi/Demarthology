import React from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <Navbar/>
            <div className="mt-20">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
}

export default MainLayout;