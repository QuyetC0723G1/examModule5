import Header from "../component/Header.jsx";
import Navbar from "../component/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../component/Footer.jsx";


const Home = () => {
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>

        </>
    )
}
export default Home;