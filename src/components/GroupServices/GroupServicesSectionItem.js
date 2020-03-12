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
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleDelete = () => {
        this.setState({ anchorEl: null });
        this.props.onDelete(this.props.id);
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <Card>
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
                                <MenuItem onClick={this.handleDelete}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    }
                    title={this.props.name}
                />
                <CardContent>
                    <Typography variant="h5">Accounts:</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {this.props.accounts
                            .map(account => (account ? account.name : null))
                            .join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default GroupServicesSectionItem;
