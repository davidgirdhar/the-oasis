import { FiUserX } from "react-icons/fi";
import supabase from "./supabaseClient";
import { supabaseUrl } from "./supabaseClient";
export async function signupApi({email, fullname, password}) {
    const {data, error}= await supabase.auth.signUp({
        email, password, options:{
            data:{
                fullname,
                avatar:""
            } 
        }
    });
     if(error) throw new Error(error.message);
    console.log("data for signUpApi",data);
    return data;
}


export async function login({email, password}) {
    
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error) throw new Error(error.message);
    console.log("data",data);
    return data;
};

export async function getCurrentUser() {
    const {data:session} = await supabase.auth.getSession();

    if(!session.session) return null;

    const {data, error} = await supabase.auth.getUser();
    console.log("data getCurrentUser",data);

    if(error) throw new Error(error.message);
    
    return data?.user;
};

export async function logout() {
     
    let { error } = await supabase.auth.signOut()
    if(error) throw new Error(error.message);
}


export async function updateCurrentUser({fullName, password, avatar}) {
    
    console.log("fullName",fullName);
    
    let updatedData;
    if(password) updatedData = {password};
    if(fullName) updatedData = {data:{fullName}};
    console.log("updatedData",updatedData);
    
    const { data, error } = await supabase.auth.updateUser(updatedData);
    // https://joeyvrvdvgarpqrqbejg.supabase.co/storage/v1/object/public/Avatars/9723582.jpg?t=2024-08-12T03%3A41%3A03.047Z

    if(error) throw new Error(error.message);
    if(!avatar) return data;
    console.log("data avatar",avatar);
    
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    console.log("fileName",fileName);
    
    const {error:storageError} = await supabase.storage.from("Avatars").upload(fileName, avatar); 
    console.log("storageError",storageError);
    
    if(storageError)  throw new Error(storageError.message);
    console.log();
    
    // ${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}
    const { data:updatedUserData, error:userError } = await supabase.auth.updateUser({data:{avatar:`${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}.jpg`}});

    console.log("updatedUserData",updatedUserData);

    if(userError) throw new Error(error.message);

    return updatedUserData;


}
