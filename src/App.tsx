import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import Home from "./Views/Home.tsx";
import Maintenance from './Views/Maintenance.tsx';
import NotFound from './Views/404.tsx';


const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Maintenance/>}/>
        <Route path='about' element={<Maintenance/>}/>
        <Route path='contact' element={<Maintenance/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Route>
));

function App() {
    return <RouterProvider router={router}/>
}

export default App;
