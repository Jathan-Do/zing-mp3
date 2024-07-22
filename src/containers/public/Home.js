import React from "react";
import { ChartSection, NewRelease, Section, Slider } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
    const { sectionItem, sectionItem2, sectionItem3, sectionItem4, sectionItem6, sectionItem7, sectionItem8 } =
        useSelector((state) => state.app);
    return (
        <div className="overflow-y-auto w-full">
            <div>
                <Slider />
                <NewRelease />
                <Section data={sectionItem} />
                <Section data={sectionItem2} />
                <Section data={sectionItem7} />
                <Section data={sectionItem8} />
                <ChartSection />
                <div className="flex items-center px-[43px] w-full mt-12">
                    {sectionItem6?.items?.map((item) => (
                        <Link to={item?.link?.split(".")[0]} key={item.link} className="flex-1 px-4">
                            <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
                        </Link>
                    ))}
                </div>
                <Section data={sectionItem3} />
                <Section data={sectionItem4} />
            </div>
        </div>
    );
};

export default Home;
