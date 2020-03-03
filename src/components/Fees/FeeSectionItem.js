import React, { Component } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Button,
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
                />
                <CardContent>
                    <Typography component="body2" color="textSecondary">
                        Hola alv
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default FeeSectionItem;
