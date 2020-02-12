import React from "react";
import { Paper, ButtonBase } from "@material-ui/core";
import FullscreenView from "../../containers/FullscreenView/FullscreenView";

const Dashboard = () => (
    <FullscreenView>
        <Paper>
            <h1>Accounts</h1>
            <ButtonBase focusRipple style={{width: "125px", height: "125px"}}>
                Add
            </ButtonBase>
        </Paper>
        <h1>Group Services</h1>
    </FullscreenView>
);

export default Dashboard;
