import React from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";

const Payments = () => (
    <AppView title="Payments">
        <h1>Items de Payments</h1>
    </AppView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Payments);
