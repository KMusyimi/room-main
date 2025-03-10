import Header from "./Header.tsx";
import {JSX} from "react";
import Main from "./Main.tsx";

export default function Layout(): JSX.Element {
    return (<>
        <Header/>
        <Main/>
    </>)
}