import React, { Component } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Menu,
    MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

class FeeSectionItem extends Component {
    state = { anchorEl: null };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    formatDate = () => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        const dtf = new Intl.DateTimeFormat("en-US", options);
        const [
            { value: month },
            ,
            { value: day },
            ,
            { value: year }
        ] = dtf.formatToParts(this.props.triggerDate);
        return `${day}/${month}/${year}`;
    };

    render() {
        const { anchorEl } = this.state;
        return (
            <Card key={this.props.id}>
                <CardHeader
                    action={
                        <div>
                            <IconButton
                                aria-label="account-item-options"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    }
                    title={this.props.name}
                    subheader={`Next Charge: ${this.formatDate()}`}
                />
                <CardContent>
                    <Typography variant="h6">Charge:</Typography>
                    <Typography variant="body2" color="textSecondary">
                        ${this.props.amount} will be charge every{" "}
                        {this.props.concurrency} day(s).
                    </Typography>
                    <Typography variant="h6">Reminder:</Typography>
                    <Typography variant="body2" color="textSecondary">
                        It will be send by{" "}
                        {this.props.reminder.options.join(" and ")} every{" "}
                        {this.props.reminder.concurrency} day(s).
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default FeeSectionItem;
