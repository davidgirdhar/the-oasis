import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

export function useBookingId() {
    console.log("called");
    const {bookingId} = useParams();

    console.log("bookingId jasknkd", bookingId);

    const {isPending, data:booking, error} = useQuery({        
        queryKey:['bookingId',bookingId], // handle key
        queryFn: () => getBooking(bookingId)
    });
    console.log('booking data',booking);
    return {isPending, booking, error};  
      
}