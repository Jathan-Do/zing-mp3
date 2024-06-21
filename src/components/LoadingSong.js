import React, { memo } from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingSong = () => {
    return (
        <RotatingLines
            visible={true}
            height="18"
            width="18"
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default memo(LoadingSong);
