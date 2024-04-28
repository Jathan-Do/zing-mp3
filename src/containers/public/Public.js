import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
    return (
        <div className="w-full flex">
            <div className="flex-none w-60 bg-[#d9d7d4]">
                <SidebarLeft />
            </div>
            <div className="flex-auto border border-blue-500 bg-[#e5e3df]">
                <Outlet />
            </div>
            <div className="flex-none w-[330px] border border-blue-500 ">
                <SidebarRight />
            </div>
        </div>
    );
};

export default Public;
