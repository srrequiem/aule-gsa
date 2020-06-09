import React from "react";
import { Paper, Button } from "@material-ui/core";

const PageSection = props => (
    <Paper>
        <Button variant="contained" color="primary" onClick={props.onCreate}>
            Add
        </Button>
        {props.children}
    </Paper>
);

export default PageSection;
