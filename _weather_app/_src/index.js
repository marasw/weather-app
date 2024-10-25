import React from "react";
import ReactDOM from "react-dom";
// import App from './App.jsx'
import './index.css'

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
 
import CounterComponent from "./components/CounterComponent";
import allReducers from "./reducers";
 
let store = createStore(allReducers);
 
const App = (
    <Provider store={store}>
        <CounterComponent />
    </Provider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)