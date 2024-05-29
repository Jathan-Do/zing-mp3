import React, { memo } from "react";

const Section = () => {
    return (
        <div className="mt-12 px-[59px]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl text-gray-700">Chill</h3>
                <span className="text-xs text-main-200 font-medium">TẤT CẢ</span>
            </div>
            <div>
                items
            </div>
        </div>
    );
};

export default memo(Section);
