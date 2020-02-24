import React from "react";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";

const Fees = () => (
    <AppView title="Fees">
        <h1>Items de Fees</h1>
    </AppView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Fees);
