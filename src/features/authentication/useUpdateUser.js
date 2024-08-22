import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi, updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
    const queryClient = useQueryClient();
    const {isloading, mutate:updateUser} = useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:({user})=>{
            toast.success("Account has been successfully created");
            // queryClient.setQueryData("user",user);
            queryClient.invalidateQueries({
                queryKey:["user"]
            });

        }
    });
    
    return {isloading, updateUser};
}

export default useUpdateUser;