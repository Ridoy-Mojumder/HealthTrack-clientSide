import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Header/Navbar";
import Footer from "../Footer/Footer";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;