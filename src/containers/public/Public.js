import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header, LoadingSong } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
    const { isLoading } = useSelector((state) => state.music);
    return (
        <div className="w-full relative flex h-screen flex-col">
            <div className="w-full h-full flex flex-auto">
                <div className="flex-none w-[218px] bg-main-300">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col bg-main-100">
                    {isLoading && (
                        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-300 flex items-center justify-center">
                            <LoadingSong />
                        </div>
                    )}
                    <div className="h-[70px] flex-none px-[59px] flex items-center">
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars style={{ width: "100%", height: "calc(100% - 80px)" }} autoHide>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                <div
                    className={`sticky top-0 right-0 bottom-0 flex-none duration-700 border bg-main-500 ${
                        isShowRightSidebar ? "animate-slide-left-show" : " animate-slide-right-hidden"
                    }`}
                >
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none fixed bottom-0 left-0 right-0 h-[80px] bg-main-200 z-50">
                <Player showRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    );
};

export default Public;
