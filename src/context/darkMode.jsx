import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({children}) {
    const [isDarkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");

    console.log("useLocalStorageState",isDarkMode);
    

    useEffect(function () {
        if(isDarkMode){
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        }
        else{
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        }
    },[isDarkMode])


    function toggleDarkMode() {        
        setDarkMode((isDark) => {
            console.log("idark",!(isDark));            
            return !(isDark)
        });
    }

    return (
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }

    return context;
}

export { DarkModeProvider, useDarkMode };
