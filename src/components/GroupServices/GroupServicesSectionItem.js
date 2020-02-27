import React, { Component } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Menu,
    MenuItem,
    IconButton
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

class GroupServicesSectionItem extends Component {
    state = {
        anchorEl: null,
        accounts: ["asdasdas", "qwert", "poiu", "cvbnm"]
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl, accounts } = this.state;
        return (
            <Card key={this.props.phone}>
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
                />
                <CardContent>
                    <Typography component="h5">Accounts:</Typography>
                    <Typography component="body2" color="textSecondary">
                        {accounts.join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default GroupServicesSectionItem;
