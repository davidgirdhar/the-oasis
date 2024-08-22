import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking(id) {
    const queryClient =  useQueryClient();
    const {isloading, mutate: deleteBook} = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess:()=> {        
        toast.success("Booking Deleted Succcesfully")        
        queryClient.invalidateQueries({
            queryKey:["booking"]
            }); 
        },      
        onError:(err) => toast.error(err.message)
        
    })

    return {isloading, deleteBook };   
};

export default useDeleteBooking;