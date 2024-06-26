import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
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
                {isShowRightSidebar ? (
                    <div className="sticky top-0 right-0 bottom-0 flex-none animate-slide-left-show duration-700 border border-red-400 bg-main-500">
                        <SidebarRight />
                    </div>
                ) : (
                    <div className="sticky top-0 right-0 bottom-0 flex-none animate-slide-right-hidden duration-700 border border-red-400 bg-main-500">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className="flex-none fixed bottom-0 left-0 right-0 h-[80px] bg-main-200 z-50">
                <Player showRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    );
};

export default Public;
