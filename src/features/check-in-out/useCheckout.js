import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router";

function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isloading:isCheckingOut, mutate:updateCheckout} = useMutation({
        mutationFn:(bookingId) => updateBooking(bookingId, {
            status:"checked-out"    
        }),
        onSuccess:()=>{
            toast.success("Sucessfully Updated Booking");
            queryClient.invalidateQueries({
                // queryKey:["booking"]
                active:true
            });
            navigate("/");
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    });

    return {isCheckingOut, updateCheckout};
}

export default useCheckout;