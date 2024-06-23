import Logo from "./Logo";
import MainNav from "./MainNav"
function Sidebar() {
    return(
        <div className="row-span-full px-[2.5rem] py-[2.5rem] bg-slate-200 border-r-2 flex flex-col gap-[3.2rem]">
            {/* Sidebar */}
            <Logo></Logo>
            <MainNav></MainNav>
        </div>
    )
}

export default Sidebar;