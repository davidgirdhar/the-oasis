import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router";
import DarkModeToggle from "./DarkModeToggle";

// const style
function HeaderMenu() {
    const navigate = useNavigate();
    return(
        <ul className="flex gap-3">
            <li>
                <ButtonIcon onClick={()=>navigate("/account")}>
                    <HiOutlineUser></HiOutlineUser>
                </ButtonIcon>
            </li>
            <li>
            <DarkModeToggle></DarkModeToggle>

            </li>
            <li>
                <Logout></Logout>
            </li>
        
        </ul>
    )
}

export default HeaderMenu;