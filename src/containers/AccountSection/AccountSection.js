import React from "react";
import { Paper } from "@material-ui/core";
import "./AccountSection.css";

const AccountSection = (props) => (
    <Paper className="AccountSection">{props.children}</Paper>
);
export default AccountSection;
