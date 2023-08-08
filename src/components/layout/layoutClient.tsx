import { Outlet } from "react-router-dom"
import Header from "./header"
import Slider from "./slider"
import Footer from "./footer"
Outlet
const LayoutClient = () => {
    return <div>
        <Header/>
        <Outlet/>
        <Footer/>
        
    </div>
}
export default LayoutClient