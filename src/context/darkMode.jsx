import { createContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darkModeContext = createContext();


function DarkModeProvider({children}) {
    const [isDarkMode, setDarkMode] = useLocalStorageState();



}