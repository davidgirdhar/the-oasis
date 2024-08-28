import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooking() {

    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("status");
    const SortByValue = searchParams.get("sortBy") || "checkInDate-desc";
    
    console.log("filterValue",filterValue,"SortByValue",SortByValue);
    const filter = filterValue === "all" || !filterValue ? null : {field:"status", value:filterValue, method:
    "eq"
    };

    const page = !searchParams.get("page") ? 1 : +(searchParams.get("page"));

    const [field, direction] = SortByValue.split("-");
    
    const sortBy = {field:field, direction:direction};

    console.log("filter in booking",filter, sortBy);
    const {isPending, data:{data:bookings, count} = {}, error} = useQuery({
        queryKey:['booking', filter, sortBy, page], // handle key
        queryFn: () => getBookings({filter, sortBy, page})
    });
    const finalPage = Math.ceil(count/PAGE_SIZE);
    if(page < finalPage){
        queryClient.prefetchQuery({
            queryKey:['booking', filter, sortBy, page +1],
            queryFn: () => getBookings({filter, sortBy, page:page + 1})
            
        })
    }

    if(page > 1){
        queryClient.prefetchQuery({
            queryKey:['booking', filter, sortBy, page - 1],
            queryFn: () => getBookings({filter, sortBy, page:page - 1})
            
        })
    }
        
    return {isPending, bookings, count, error}    
}


