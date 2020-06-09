import React from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";

const Dashboard = () => (
    <AppView title="Dashboard">
        <h1>Items de dashboard</h1>
    </AppView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);
