/* eslint-disable react/jsx-pascal-case */
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Personal, Public, Album_Playlist, WeekRank } from "./containers/public";
import path from "./utils/paths";
import * as actions from "./store/actions";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
    const dispatch = useDispatch(); //dispatch đóng vai một nhân viên trong bưu điện
    useEffect(() => {
        dispatch(actions.getHome()); // nhân viên nhận công việc(1 trong các reducer) trong bưu điện đó
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
                        <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
