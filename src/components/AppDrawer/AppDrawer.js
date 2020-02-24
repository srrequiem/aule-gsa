import React from "react";
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {
    ExitToApp,
    Settings,
    AccountBox,
    Group,
    LocalAtm,
    Payment
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { Routes } from "../../constants/Routes";

const AppDrawer = props => (
    <Drawer open={props.open} onClose={props.onClose}>
        <div
            role="presentation"
            onClick={props.onClose}
            onKeyDown={props.onClose}
        >
            <List>
                {[
                    {
                        text: "Accounts",
                        route: Routes.ACCOUNTS,
                        icon: <AccountBox />
                    },
                    {
                        text: "Group Services",
                        route: Routes.GROUP_SERVICES,
                        icon: <Group />
                    },
                    { text: "Fees", route: Routes.FEES, icon: <LocalAtm /> },
                    {
                        text: "Payments",
                        route: Routes.PAYMENTS,
                        icon: <Payment />
                    },
                    {
                        text: "Settings",
                        route: Routes.SETTINGS,
                        icon: <Settings />
                    }
                ].map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => props.history.push(item.route)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[{ text: "Log out", icon: <ExitToApp /> }].map(item => (
                    <ListItem button key={item.text}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    </Drawer>
);

export default withRouter(AppDrawer);
