import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";

function useLogout() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {mutate:logout, isloading} = useMutation({
        mutationFn:logoutApi,
        onSuccess:()=>{
            navigate("/login",{replace:true});
            queryClient.removeQueries();
        }
    });

    return {isloading, logout};
};


export default useLogout;

