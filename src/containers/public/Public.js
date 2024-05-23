import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
    return (
        <div className="w-full flex min-h-screen flex-col">
            <div className="w-full h-full flex flex-auto">
                <div className="flex-none w-[218px] bg-main-300">
                    <SidebarLeft />
                </div>
                <div className="flex-auto bg-main-100">
                    <div className="h-[70px] px-[59px] flex items-center">
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className="flex-none hidden 1200:flex w-72 animate-slide-left bg-black">
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none h-[80px] bg-main-200 z-50">
                <Player />
            </div>
        </div>
    );
};

export default Public;
