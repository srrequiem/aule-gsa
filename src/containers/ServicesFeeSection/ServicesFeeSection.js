import React from "react";
import { Paper } from "@material-ui/core";
import "./ServicesFeeSection.css";

const ServicesFeeSection = (props) => (
    <Paper className="ServicesFeeSection">{props.children}</Paper>
);
export default ServicesFeeSection;
