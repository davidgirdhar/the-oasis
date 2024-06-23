import supabase from "./supabaseClient";

export async function fetchCabins() {
    let { data: Cabins, error } = await supabase.from('Cabins')
    .select('*');
    if(error){
        console.log("cabins can't be loaded", error);
        throw new Error("cabins can't be loaded");
    }
    return Cabins;
}


export async function deleteCabin(id) {
    const {data, error} = await supabase
    .from('Cabins')
    .delete()
    .eq("id", id)

    if(error){
        console.log("cabins can't be deleted", error);
        throw new Error("cabins can't be deleted");
    };
    return data;

}