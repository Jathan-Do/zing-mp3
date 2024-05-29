import React from "react";
import { Section, Slider } from "../../components";

const Home = () => {
    return (
        <div className="overflow-y-auto w-full">
            <div>
                <Slider />
                <Section />
            </div>
        </div>
    );
};

export default Home;
