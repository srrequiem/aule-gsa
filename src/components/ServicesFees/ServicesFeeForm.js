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
    MenuItem,
} from "@material-ui/core";
import { LocalAtm, AttachMoney, Person } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import { isFloatValid } from "../../utils/Validation";
import { withFirebase } from "../../hoc/FirebaseContext";

class ServicesFeeForm extends Component {
    state = {
        name: {
            value: "",
            helperText: "",
        },
        amount: {
            value: 0,
            helperText: "",
        },
        triggerDate: {
            value: new Date(),
            helperText: "",
        },
        accounts: {
            value: [],
            helperText: "",
        },
        fetchedAccounts: [],
    };

    componentDidMount() {
        this.props.firebase.getAccounts().then((snapshots) => {
            const fetchedAccounts = [];
            snapshots.forEach((doc) =>
                fetchedAccounts.push({ id: doc.id, ...doc.data() })
            );
            this.setState({ fetchedAccounts });
        });
    }

    onFeeCreation = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            const { name, amount, triggerDate, accounts } = this.state;
            const fee = {
                name: name.value,
                amount: parseFloat(amount.value),
                triggerDate: triggerDate.value,
                accountsIDS: accounts.value,
            };
            this.props.firebase
                .saveServicesFee(fee)
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
        }
    };

    isFormValid = () => {
        return this.isNameValid() && this.isAmountValid();
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

    isAmountValid = () => {
        const { amount } = this.state;
        return amount.helperText === "";
    };

    validateAmount = () => {
        const { amount } = this.state;
        const validateAmountState = {
            ...amount,
            helperText: "",
        };
        if (!isFloatValid(amount.value)) {
            validateAmountState.helperText = "You must enter a valid number";
        }
        this.setState({ amount: validateAmountState });
    };

    render() {
        const {
            name,
            amount,
            triggerDate,
            accounts,
            fetchedAccounts,
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={this.onFeeCreation}>
                    <Card>
                        <CardHeader title={"New service fee"} />
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
                                    onChange={(e) => {
                                        this.setState({
                                            name: {
                                                ...name,
                                                value: e.target.value,
                                            },
                                        });
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LocalAtm />
                                        </InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                                <FormHelperText id="name-helper-text">
                                    {name.helperText}
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                error={!this.isAmountValid()}
                                required
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-amount">
                                    Amount
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-amount"
                                    value={amount.value}
                                    onBlur={this.validateAmount}
                                    onChange={(e) => {
                                        this.setState({
                                            amount: {
                                                ...amount,
                                                value: e.target.value,
                                            },
                                        });
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                                <FormHelperText id="amount-helper-text">
                                    {amount.helperText}
                                </FormHelperText>
                            </FormControl>
                            <KeyboardDatePicker
                                required
                                inputVariant="outlined"
                                id="date-picker-dialog"
                                label="Trigger Date"
                                format="MM/dd/yyyy"
                                value={triggerDate.value}
                                onChange={(date) => {
                                    this.setState({
                                        triggerDate: {
                                            ...triggerDate,
                                            value: date,
                                        },
                                    });
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
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
                                    onChange={(e) => {
                                        this.setState({
                                            accounts: {
                                                ...accounts,
                                                value: e.target.value,
                                            },
                                        });
                                    }}
                                    labelWidth={60}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    }
                                >
                                    {fetchedAccounts.map((account) => (
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
                            <Button onClick={this.props.onCancel}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Add fee
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </MuiPickersUtilsProvider>
        );
    }
}

export default withFirebase(ServicesFeeForm);
