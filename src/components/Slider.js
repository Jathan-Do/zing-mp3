import React from "react";
import { useSelector } from "react-redux";

const Slider = () => {
    const { banner } = useSelector((state) => state.app); //dùng useSelector để lấy đúng vào reducer cần dùng
    console.log(banner);
    return (
        <div className="flex flex-col">
            {banner?.map((item) => (
                <img key={item.encodeId} src={item.banner} className="flex-1 object-contain" alt="banner"/>
            ))}
        </div>
    );
};

export default Slider;
