import React from "react";
import "./App.css";
import Auth from "./containers/Auth/Auth";
import { ThemeProvider } from "@material-ui/core";

function App() {
    return (
        <ThemeProvider>
            <Auth />
        </ThemeProvider>
    );
}

export default App;
