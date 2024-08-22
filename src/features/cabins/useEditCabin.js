import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";


export function useEditCabin() {    
    const queryClient = useQueryClient();

    const {isloading:isEditing, mutate:editCabin} = useMutation({
    mutationFn:({newCabinData, id}) =>  createEditCabin(newCabinData, id),
    onSuccess:()=>
      {
        toast.success("Cabin edited succesfully");
        queryClient.invalidateQueries({
          queryKey:["cabin"]
        });
      },
      onError:(err)=>{
          toast.error(err.message);
        }
    });
    return {isEditing, editCabin};
}
