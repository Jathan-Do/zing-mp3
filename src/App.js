/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Personal, Public, Album_Playlist } from "./containers/public";
import path from "./utils/paths";
import * as actions from "./store/actions";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();//dispatch đóng vai một nhân viên trong bưu điện
    useEffect(() => {
        dispatch(actions.getHome());// nhân viên nhận công việc(1 trong các reducer) trong bưu điện đó
    }, []);

    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.ALL} element={<Home />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route path={path.ALBUM_PLAYLIST_TITLE_PID} element={<Album_Playlist />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
