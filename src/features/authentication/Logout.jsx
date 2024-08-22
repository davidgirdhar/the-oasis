import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const {isloading, logout} = useLogout();
    return(
        <ButtonIcon onClick={logout} disabled={isloading}>
            {
                isloading ? <SpinnerMini></SpinnerMini>
            : <HiArrowRightOnRectangle>
                Logout
            </HiArrowRightOnRectangle>
            }
        </ButtonIcon>
    ) 
    
};

export default Logout;