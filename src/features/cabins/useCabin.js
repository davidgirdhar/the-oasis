import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";

export function useCabin() {
    
    const {isPending, data:cabins, error} = useQuery({
        queryKey:['cabin'], // handle key
        queryFn: fetchCabins
    });
    console.log('Cabins',cabins);
    return {isPending, cabins, error}    
      
}