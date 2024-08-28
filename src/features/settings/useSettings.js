import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {

    const {isPending, data:settings, error} = useQuery({
        queryKey:['setting'], // handle key
        queryFn: getSettings
    });
    return {isPending, settings, error}
}   