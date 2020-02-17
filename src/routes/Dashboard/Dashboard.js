import React from "react";
import {
    Paper,
    ButtonBase,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Button,
    IconButton
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { withAuthorization } from "../../hoc/Auth";
import AppView from "../../containers/AppView/AppView";

const ACCOUNTS = [
    {
        name: "Gustavo Gama",
        email: "test@test.com",
        phone: "5514890219",
        balance: "-325",
        feesIds: ["asdfghjk", "sdfghjk"]
    },
    {
        name: "Gustavo Gama",
        email: "test@test.com",
        phone: "5514890211",
        balance: "-325",
        feesIds: ["asdfghjk", "sdfghjk"]
    },
    {
        name: "Gustavo Gama",
        email: "test@test.com",
        phone: "5514890212",
        balance: "-325",
        feesIds: ["asdfghjk", "sdfghjk"]
    },
    {
        name: "Gustavo Gama",
        email: "test@test.com",
        phone: "5514890213",
        balance: "-325",
        feesIds: ["asdfghjk", "sdfghjk"]
    },
    {
        name: "Gustavo Gama",
        email: "test@test.com",
        phone: "5514890214",
        balance: "-325",
        feesIds: ["asdfghjk", "sdfghjk"]
    }
];

const Dashboard = () => (
    <AppView title="Dashboard">
        <Paper>
            <Typography variant="h4">Accounts</Typography>
            {ACCOUNTS.map(item => (
                <Card key={item.phone}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="account"
                            >
                                G
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="edit">
                                <Edit />
                            </IconButton>
                        }
                        title={item.name}
                        subheader={`${item.email} - ${item.phone}`}
                    />
                    <CardContent>
                        <Typography>Balance: {item.balance}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Show Payments</Button>
                        <Button size="small">Show Fees</Button>
                    </CardActions>
                </Card>
            ))}
            <ButtonBase focusRipple style={{ width: "125px", height: "125px" }}>
                Add
            </ButtonBase>
        </Paper>
        <h1>Group Services</h1>
    </AppView>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);
