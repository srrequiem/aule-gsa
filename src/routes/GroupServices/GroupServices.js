import React from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";

const GroupServices = () => (
    <AppView title="GroupServices">
        <h1>Items de GroupServices</h1>
    </AppView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupServices);
