import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import Home from "./Views/Home.tsx";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Layout/>}>
        <Route index element={<Home/>}/>
    </Route>
))

function App() {

    return <RouterProvider router={router}/>
}

export default App
