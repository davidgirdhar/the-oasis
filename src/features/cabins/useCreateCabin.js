import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// Create an instance of QueryClient

export function useCreateCabin() {
    const queryClient = useQueryClient();
    // console.log("dupl",data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoading: isCreating, mutate: createCabin} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New Cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabin"]
            });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return {isCreating, createCabin};
}
