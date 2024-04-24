import React from "react";
import logo from "../assets/logoZing.svg";
import sidebarMenu from "../utils/menu";
import { NavLink } from "react-router-dom";

const active = "py-3 px-[21px] flex items-center text-sm font-semibold text-[#0F7070]";
const unActive = "py-3 px-[21px] flex items-center text-sm font-semibold text-[#32323D]";
const SidebarLeft = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full h-[70px] px-7 flex items-center">
                <img src={logo} alt="logo" width={120} height={40} className="object-cover" />
            </div>
            <div className="flex flex-col">
                {sidebarMenu.map((item) => (
                    <NavLink
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
