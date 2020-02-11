import React from "react";
import Login from "./routes/Login/Login";
import Home from "./routes/Home/Home";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <ThemeProvider>
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </Router>
        </ThemeProvider>
    );
}

export default App;
