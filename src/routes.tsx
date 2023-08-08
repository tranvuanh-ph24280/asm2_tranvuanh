import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";
import LayoutClient from "./components/layout/layoutClient";
import HomePage from "./page/homepage";
import ProductDetailPage from "./page/detail";
import CartPage from "./page/cart";
import Notfound from "./page/notfound";
import Admin from "./page/admin";
import UpdateProduct from "./page/updateProduct";
import AddProduct from "./page/addProduct";
import SignUp from "./page/signup";
import SignIn from "./page/signin";
import Category from "./page/category";

export const router = createBrowserRouter([
    // Định nghĩa route cho website
    {
        path: "/",
        element: (
            <div>
                <LayoutClient/>
                
            </div>
        ),
        children: [
            { index: true, element: <div><HomePage/></div> },
            { path: "about", element: <div>About Page</div> },
            { path: "cart", element: <div><CartPage/></div> },
            { path: "products/:id", element: <div><ProductDetailPage/></div> },
        ],
        
    },
    { path: "signup", element: <div><SignUp/></div> },
    { path: "signin", element: <div><SignIn/></div> },
    // Định nghĩa route cho admin
    {
        path: "/admin",
        element: (
            <div>
                 <Outlet />
                
            </div>
            
            
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <div><Admin/></div> },
            { path: "dashboard/product/update/:id", element: <div><UpdateProduct/></div> },
            { path: "dashboard/product/add", element: <div><AddProduct/></div> },
            { path: "dashboard/category", element: <div><Category/></div> },

        ],
    },
    { path: "*", element: <Notfound/> },
]);
