import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Header from "./Components/Header.tsx";
import Layout from "./Components/Layout.tsx";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Layout/>}>
        <Route index element={<Header/>}/>
    </Route>
))

function App() {

    return <RouterProvider router={router}/>
}

export default App
