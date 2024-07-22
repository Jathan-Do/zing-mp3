// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { SidebarLeft, SidebarRight, Player, Header, LoadingSong } from "../../components";
// import Scrollbars from "react-custom-scrollbars-2";
// import { useSelector } from "react-redux";

// const Public = () => {
//     const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
//     const { isLoading } = useSelector((state) => state.music);
//     const [isScrolled, setIsScrolled] = useState(false);
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);
//     return (
//         <div className="w-full relative flex h-screen flex-col">
//             <div className="w-full h-full flex flex-auto">
//                 <div className="flex-none w-[218px] bg-main-300">
//                     <SidebarLeft />
//                 </div>
//                 <div className="flex-auto relative flex flex-col bg-main-100">
//                     {isLoading && (
//                         <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-300 flex items-center justify-center">
//                             <LoadingSong />
//                         </div>
//                     )}
//                     <div className="h-[70px] flex-none px-[59px] flex items-center">
//                         <Header />
//                     </div>
//                     <div className="flex-auto w-full">
//                         <Scrollbars style={{ width: "100%", height: "calc(100% - 80px)" }} autoHide>
//                             <Outlet />
//                         </Scrollbars>
//                     </div>
//                 </div>
//                 <div
//                     className={`sticky top-0 right-0 bottom-0 flex-none duration-700 border bg-main-500 ${
//                         isShowRightSidebar ? "animate-slide-left-show" : " animate-slide-right-hidden"
//                     }`}
//                 >
//                     <SidebarRight />
//                 </div>
//             </div>
//             <div className="flex-none fixed bottom-0 left-0 right-0 h-[80px] bg-main-200 z-50">
//                 <Player showRightSidebar={setIsShowRightSidebar} />
//             </div>
//         </div>
//     );
// };

// export default Public;
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header, LoadingSong } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
    const { isLoading } = useSelector((state) => state.music);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current?.getScrollTop() > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const currentScrollRef = scrollRef.current;
        currentScrollRef?.view.addEventListener("scroll", handleScroll);

        return () => {
            currentScrollRef?.view.removeEventListener("scroll", handleScroll);
        };
    }, [scrollRef]);

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
                    <div
                        className={`h-[70px] flex-none px-[59px] flex items-center ${
                            isScrolled
                                ? isShowRightSidebar
                                    ? "shadow-md w-[70.25%] bg-[rgba(229,227,223,0.8)] backdrop-blur-[50px] fixed z-50 duration-[580ms]"
                                    : "shadow-md w-[88%] bg-[rgba(229,227,223,0.8)] backdrop-blur-[50px] fixed z-50 duration-[660ms]"
                                : ""
                        }`}
                    >
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars ref={scrollRef} style={{ width: "100%", height: "calc(100% - 80px)" }} autoHide>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                <div
                    className={`top-0 right-0 bottom-0 flex-none duration-700 border bg-main-500 ${
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
