import { queryOptions } from "@tanstack/react-query";
import supabase, { supabaseUrl } from "./supabaseClient";

export async function fetchCabins() {
    console.log("fetch cabins");
    let { data: Cabins, error } = await supabase.from('Cabins')
    .select('*');
    if(error){
        throw new Error("cabins can't be loaded");
    }
    return Cabins;
}

export async function createEditCabin(newCabin, id) {
    
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image?.name ?? ''}`.replaceAll("/", "");

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from('Cabins');
    // let result;
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.log("cabins can't be updated", error);
        throw new Error("Cabins can't be updated");
    }

    if (newCabin.image && !hasImagePath) {
        const file = newCabin.image;
        console.log("file",file);
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

        console.log("blob", blob, newCabin.image);
        const { error: storageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, blob, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'image/jpeg'
            });

        if (storageError) {
            console.log("in storage errror",storageError);
            await deleteCabin(data.id);
            console.error("storage", storageError);
            throw new Error("Cabins image can't be uploaded");
        }
    }
    return data;
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