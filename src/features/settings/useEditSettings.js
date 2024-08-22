import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";


export function useUpdateSetting() {    
    const queryClient = useQueryClient();

    const {isloading:isupdating, mutate:editSetting} = useMutation({
    mutationFn:updateSetting,
    onSuccess:()=>
      {
        toast.success("Settings updated successfully");
        queryClient.invalidateQueries({
          queryKey:["setting"]
        });
      },
      onError:(err)=>{
          toast.error(err.message);
        }
    });
    return {isupdating, editSetting};
}
