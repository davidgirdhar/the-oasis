import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

function Header() {
    return(
        <header className="col-span-1 border-b-2 p-2 flex gap-3 items-center justify-end">
            <UserAvatar></UserAvatar>
            <HeaderMenu></HeaderMenu>
        </header>
    )
}

export default Header;