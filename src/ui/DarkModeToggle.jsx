import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/darkMode"

function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode();
    console.log("isDarkMode",isDarkMode,toggleDarkMode);
    
    return(
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <AiOutlineSun></AiOutlineSun> : <AiOutlineMoon></AiOutlineMoon> }
        </ButtonIcon>
    )
}

export default DarkModeToggle