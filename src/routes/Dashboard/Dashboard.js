import React from "react";
import { Paper, ButtonBase, Button } from "@material-ui/core";
import FullscreenView from "../../containers/FullscreenView/FullscreenView";
import { withAuthorization } from "../../hoc/Auth" ;

const Dashboard = props => (
    <FullscreenView>
        <Button variant="contained" color="primary" onClick={() => null}>
            Logout
        </Button>
        <Paper>
            <h1>Accounts</h1>
            <ButtonBase focusRipple style={{ width: "125px", height: "125px" }}>
                Add
            </ButtonBase>
        </Paper>
        <h1>Group Services</h1>
    </FullscreenView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);
