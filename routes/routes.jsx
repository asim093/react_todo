import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login/login";
import Signup from "../src/pages/signup/signup";
import Notfound from "../src/pages/NotFound/Notfound";
import Home from "../src/pages/Home/Home";

export const publicroute = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/Home', element: <Home /> },
    { path: '*', element: <Notfound /> },
]);
