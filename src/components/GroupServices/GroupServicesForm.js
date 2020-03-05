import React, { Component } from "react";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Select,
    MenuItem
} from "@material-ui/core";
import { Person, OndemandVideo } from "@material-ui/icons";

import { withFirebase } from "../../hoc/FirebaseContext";

class GroupServicesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                helperText: ""
            },
            accounts: {
                value: [],
                helperText: ""
            },
            fetchedAccounts: []
        };
    }

    componentDidMount() {
        this.props.firebase.getAccounts().then(snapshots => {
            const fetchedAccounts = [];
            snapshots.forEach(doc =>
                fetchedAccounts.push({ id: doc.id, ...doc.data() })
            );
            this.setState({ fetchedAccounts });
        });
    }

    onAccountCreation = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            const { name, accounts } = this.state;
            const groupService = {
                name: name.value,
                accounts: accounts.value
            };
            this.props.firebase
                .saveGroupService(groupService)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
    };

    isFormValid = () => {
        return this.isNameValid();
    };

    isNameValid = () => {
        const { name } = this.state;
        return name.helperText === "";
    };

    validateName = () => {
        const { name } = this.state;
        const validateNameState = { ...name, helperText: "" };
        if (name.value.length < 3) {
            validateNameState.helperText = "Name too short";
        }
        this.setState({ name: validateNameState });
    };

    render() {
        const { name, accounts, fetchedAccounts } = this.state;
        return (
            <form onSubmit={this.onAccountCreation}>
                <Card>
                    <CardHeader title={"New group service"} />
                    <CardContent>
                        <FormControl
                            error={!this.isNameValid()}
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-name">
                                Name
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-name"
                                value={name.value}
                                onBlur={this.validateName}
                                onChange={e => {
                                    this.setState({
                                        name: { ...name, value: e.target.value }
                                    });
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <OndemandVideo />
                                    </InputAdornment>
                                }
                                labelWidth={60}
                            />
                            <FormHelperText id="name-helper-text">
                                {name.helperText}
                            </FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-accounts"
                                id="outlined-adornment-accounts"
                            >
                                Accounts
                            </InputLabel>
                            <Select
                                labelId="outlined-adornment-accounts"
                                id="outlined-adornment-accounts-select"
                                multiple
                                value={accounts.value}
                                onChange={e => {
                                    this.setState({
                                        accounts: {
                                            ...accounts,
                                            value: e.target.value
                                        }
                                    });
                                }}
                                labelWidth={60}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                }
                            >
                                {fetchedAccounts.map(account => (
                                    <MenuItem
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {account.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </CardContent>
                    <CardActions style={{ justifyContent: "flex-end" }}>
                        <Button onClick={this.props.onCancel}>Cancel</Button>
                        <Button color="primary" type="submit">
                            Add Group Service
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withFirebase(GroupServicesForm);
