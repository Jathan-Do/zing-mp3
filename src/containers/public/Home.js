import React from "react";
import { Section, Slider } from "../../components";
import { useSelector } from "react-redux";
const Home = () => {
    const { sectionItem, sectionItem2, sectionItem3, sectionItem4 } = useSelector((state) => state.app);
    return (
        <div className="overflow-y-auto w-full">
            <div>
                <Slider />
                <Section data={sectionItem} />
                <Section data={sectionItem2} />
                <Section data={sectionItem3} />
                <Section data={sectionItem4} />
            </div>
        </div>
    );
};

export default Home;
