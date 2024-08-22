import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{isLoading:isLoggin, mutate: logIn} = useMutation(
        {
            mutationFn:({email, password}) => login({email, password}),
            onSuccess:(user)=>{
                queryClient.setQueryData(["user"], user.user);
                console.log("user",user);
                toast.success("Login Successfully");
                navigate("/dashboard");
            },
            onError:(err)=>{
                console.log("Errro",err);
                toast.error("Provided Email or Password is Incorrect");
            }
        }
    )

    return {isLoggin, logIn};
}