import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient =  useQueryClient();
    const {isloading, mutate: deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess:()=> {
        
        toast.success("query Updated Succcesfully")        
        queryClient.invalidateQueries({
            queryKey:["cabin"]
            }); 
        },      
        onError:(err) => toast.error(err.message)
        
    })

    return {isloading, deleteCabin };
}