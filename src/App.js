import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import { Routes } from "./constants/Routes";
import { withAuthentication } from "./hoc/Auth";
import Login from "./routes/Login/Login";
import Home from "./routes/Home/Home";
import Dashboard from "./routes/Dashboard/Dashboard";
import Accounts from "./routes/Accounts/Accounts";
import ServicesFees from "./routes/ServicesFees/ServicesFees";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Switch>
                    <Route exact path={Routes.HOME} component={Home} />
                    <Route exact path={Routes.LOGIN} component={Login} />
                    <Route
                        exact
                        path={Routes.DASHBOARD}
                        component={Dashboard}
                    />
                    <Route exact path={Routes.ACCOUNTS} component={Accounts} />
                    <Route exact path={Routes.SERVICES_FEES} component={ServicesFees} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default withAuthentication(App);
