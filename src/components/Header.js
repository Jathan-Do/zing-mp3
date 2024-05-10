import React from "react";
import icons from "../utils/icon";
import Search from "./Search";

const { GoArrowLeft, GoArrowRight } = icons;

const Header = () => {
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-4 w-full">
                <div className="flex text-main-100 gap-4 items-center">
                    <span>
                        <GoArrowLeft size={24} />
                    </span>
                    <span>
                        <GoArrowRight size={24} />
                    </span>
                </div>
                <div className="w-3/5"><Search/></div>
            </div>
            <div>login</div>
        </div>
    );
};

export default Header;
