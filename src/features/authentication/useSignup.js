import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const {isloading, mutate:signUp} = useMutation({
        mutationFn:signupApi,
        onSuccess:(user)=>{
            console.log("user",user);
            toast.success("Account has been successfully created");
        }
    });
    
    return {isloading, signUp};

}