import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getArrSlider } from "../utils/function";

const Slider = () => {
    const { banner } = useSelector((state) => state.app); //dùng useSelector để lấy đúng vào reducer cần dùng
    useEffect(() => {
        const sliderElements = document.querySelectorAll(".slider-item");
        let start = 0;
        let end = 2;
        const interval = setInterval(() => {
            const listSlider = getArrSlider(start, end, sliderElements.length - 1);
            for (let i = 0; i < sliderElements.length; i++) {
                if (listSlider.some((item) => item === i)) {
                    sliderElements[i].style.display = "block";
                } else {
                    sliderElements[i].style.display = "none";
                }
            }
            //012 123 230 301
            if (start === sliderElements.length - 1) {
                start = 0;
            } else {
                start += 1;
            }
            if (end === sliderElements.length - 1) {
                end = 0;
            } else {
                end += 1;
            }
            console.log(listSlider);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex gap-8 w-full overflow-hidden px-[59px] pt-8">
            {banner?.map((item) => (
                <img
                    key={item.encodeId}
                    src={item.banner}
                    className="slider-item rounded-lg w-1/3 object-contain flex-1"
                    alt="banner"
                />
            ))}
        </div>
    );
};

export default Slider;
