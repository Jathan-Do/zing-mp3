import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Public } from "./containers/public";
import path from "./utils/paths";

function App() {
    return (
        <>
            <div className="">
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.ALL} element={<Home />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
