import React from "react";
import Auth from "./containers/Auth/Auth";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <Auth />
            </ThemeProvider>
        </div>
    );
}

export default App;
