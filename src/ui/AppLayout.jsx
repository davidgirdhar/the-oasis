import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
background-color:green
`;

function AppLayout() {
    return(
        <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-screen">            
            <Header></Header>
            <Sidebar></Sidebar>
            <main className="bg-slate-300 p-5">
            <div className="max-w-[130rem] my-auto mx-auto flex flex-col gap-10">
                <Outlet></Outlet>
            </div>
            </main>
        
        </div>
    )
};

export default AppLayout;