import React, { Component } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

class AccountSectionItem extends Component {
    state = { anchorEl: null };

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

    handlePayment = () => {
        this.setState({ anchorEl: null });
        this.props.onAddPayment(this.props.id);
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <Card>
                <CardHeader
                    avatar={<Avatar aria-label="account">G</Avatar>}
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
                                <MenuItem onClick={this.handlePayment}>
                                    Add Payment
                                </MenuItem>
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
                    subheader={`${this.props.email} - ${this.props.phone}`}
                />
                <CardContent>
                    <Typography>Balance: {this.props.balance}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Show Payments</Button>
                    <Button size="small">Show Fees</Button>
                </CardActions>
            </Card>
        );
    }
}

export default AccountSectionItem;
