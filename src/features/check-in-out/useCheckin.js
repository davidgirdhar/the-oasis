import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router";

function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isloading:isUpdating, mutate:updateCheckin} = useMutation({
        mutationFn:({ bookingId, breakfast}) => updateBooking(bookingId, {
            status:"checked-in",
            isPaid:true,
            ...breakfast
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

    return {isUpdating, updateCheckin};
}

export default useCheckin;