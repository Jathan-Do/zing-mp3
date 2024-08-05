import React from 'react'
import { Outlet } from 'react-router-dom';

const SearchAll = () => {
    return (
        <div>
            Search{" "}
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default SearchAll