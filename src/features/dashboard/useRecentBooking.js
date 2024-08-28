import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBooking() {
    const [ searchParams ] = useSearchParams();

    const numDays = +(searchParams.get("last")) ? +(searchParams.get("last")) : 7;

    const queryDate = subDays(new Date(), numDays).toISOString();


    const {isLoading, data:bookings} = useQuery({
        queryKey:["bookings",`last-${numDays}`],
        queryFn:() => getBookingsAfterDate(queryDate)
    });

    return {isLoading, bookings};
};


export default useRecentBooking;