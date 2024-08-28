import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
    const {isLoading, data:todayData} = useQuery({
        queryFn:getStaysTodayActivity,
        queryKey:["today-activity"],        
    })

    return {isLoading, todayData};
}

export default useTodayActivity;