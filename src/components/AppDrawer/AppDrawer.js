import React from "react";
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { ExitToApp, Settings } from "@material-ui/icons";

const AppDrawer = props => (
    <Drawer open={props.open} onClose={props.onClose}>
        <div
            role="presentation"
            onClick={props.onClose}
            onKeyDown={props.onClose}
        >
            <List>
                {[{ text: "Settings", icon: <Settings /> }].map(item => (
                    <ListItem button key={item.text}>
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

export default AppDrawer;
