import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reduxConfig from "./redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const {store, persistor} = reduxConfig();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* PersistGate - This delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux.
        NOTE the PersistGate loading prop can be null, or any react instance, e.g. loading={<Loading />} */}
        <PersistGate loading={null} persistor={persistor}>
            {" "}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
