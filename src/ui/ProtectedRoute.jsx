import { Navigate, useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({children}) {
    
    const {isLoading, isAuthenticate} = useUser();
    const navigate = useNavigate();

    useEffect(function () {
        if(!isAuthenticate && !isLoading){
            navigate("/login");
        }
    },[isAuthenticate, isLoading, navigate])

    if(isLoading) return (
        <div className="h-[100vh] flex items-center justify-center">
            <Spinner></Spinner>
        </div>

    );

    if(isAuthenticate) return children;

};

export default ProtectedRoute;


