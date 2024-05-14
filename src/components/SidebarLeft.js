import React from "react";
import logo from "../assets/logoZing.svg";
import sidebarMenu from "../utils/menu";
import { NavLink, useNavigate } from "react-router-dom";
import path from "../utils/paths";

const active =
    "py-3 pr-[21px] pl-[18.5px] flex items-center text-sm font-semibold text-main-400 border-l-[3px] border-[#644646] bg-main-400";
const unActive = "py-3 px-[21px] flex items-center text-sm font-semibold text-main-300 hover:text-main-400";
const SidebarLeft = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full">
            {/* Dùng cách nào để trỏ về HOME cũng được 
             <NavLink to={path.HOME} className="w-full h-[70px] px-7 flex items-center cursor-pointer">
                <img src={logo} alt="logo" width={120} height={40} className="object-cover" />
            </NavLink> */}
            <div onClick={() => navigate(path.HOME)} className="w-full h-[70px] px-7 flex items-center cursor-pointer">
                <img src={logo} alt="logo" width={120} height={40} className="object-cover" />
            </div>
            <div className="flex flex-col">
                {sidebarMenu.map((item) => (
                    <NavLink
                        title={item.text}
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => (isActive ? active : unActive)}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SidebarLeft;
