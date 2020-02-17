import React from "react";
import {
    Paper,
    ButtonBase,
    Typography
} from "@material-ui/core";

const DashboardSection = props => (
    <Paper>
        <Typography variant="h4">{props.title}</Typography>
        {props.itemData.map(item => props.renderItem(item))}
        <ButtonBase focusRipple style={{ width: "125px", height: "125px" }}>
            Add
        </ButtonBase>
    </Paper>
);

export default DashboardSection;
