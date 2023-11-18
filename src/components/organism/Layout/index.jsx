/* eslint-disable react/prop-types */
import Nav from "../Navbar";
import Footer from "../Footer";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
        <Nav />
            <Box minH={"85vh"}>
                <Outlet />
            </Box>
        <Footer />
        </>
    )
}

export default Layout;