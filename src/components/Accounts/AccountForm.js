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
import {
    Person,
    Phone,
    Email,
    AccountBalance,
    LocalAtm
} from "@material-ui/icons";

import { isEmailValid, isFloatValid } from "../../utils/Validation";
import { withFirebase } from "../../hoc/FirebaseContext"

const FEES = ["qwerty1", "qwerty2", "qwerty3", "qwerty4"];

class AccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                helperText: ""
            },
            phone: {
                value: "",
                helperText: ""
            },
            email: {
                value: "",
                helperText: ""
            },
            balance: {
                value: 0,
                helperText: ""
            },
            fees: {
                value: [],
                helperText: ""
            }
        };
    }

    onAccountCreation = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            const { name, phone, email, balance, fees } = this.state;
            const account = {
                name: name.value,
                phone: phone.value,
                email: email.value,
                balance: parseFloat(balance.value),
                fees: fees.value
            };
            this.props.firebase
                .saveAccount(account)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
    };

    isFormValid = () => {
        return (
            this.isNameValid() &&
            this.isPhoneValid() &&
            this.isEmailValid() &&
            this.isBalanceValid()
        );
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

    isPhoneValid = () => {
        const { phone } = this.state;
        return phone.helperText === "";
    };

    validatePhone = () => {
        const { phone } = this.state;
        const validatePhoneState = { ...phone, helperText: "" };
        if (phone.value.length < 3) {
            validatePhoneState.helperText = "Name too short";
        }
        this.setState({ phone: validatePhoneState });
    };

    isEmailValid = () => {
        const { email } = this.state;
        return email.helperText === "";
    };

    validateEmail = () => {
        const { email } = this.state;
        const validateEmailState = { ...email, helperText: "" };
        if (!isEmailValid(email.value)) {
            validateEmailState.helperText =
                "You must enter a valid email address";
        }
        this.setState({ email: validateEmailState });
    };

    isBalanceValid = () => {
        const { balance } = this.state;
        return balance.helperText === "";
    };

    validateBalance = () => {
        const { balance } = this.state;
        const validateBalanceState = { ...balance, helperText: "" };
        if (!isFloatValid(balance.value)) {
            validateBalanceState.helperText = "You must enter a valid number";
        }
        this.setState({ balance: validateBalanceState });
    };

    render() {
        const { name, phone, email, balance, fees } = this.state;
        return (
            <form onSubmit={this.onAccountCreation}>
                <Card>
                    <CardHeader title={"New account"} />
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
                                        <Person />
                                    </InputAdornment>
                                }
                                labelWidth={60}
                            />
                            <FormHelperText id="name-helper-text">
                                {name.helperText}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            error={!this.isPhoneValid()}
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-phone">
                                Phone
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-phone"
                                value={phone.value}
                                onBlur={this.validatePhone}
                                onChange={e => {
                                    this.setState({
                                        phone: {
                                            ...phone,
                                            value: e.target.value
                                        }
                                    });
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Phone />
                                    </InputAdornment>
                                }
                                labelWidth={60}
                            />
                            <FormHelperText id="phone-helper-text">
                                {phone.helperText}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            error={!this.isEmailValid()}
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-email">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-email"
                                value={email.value}
                                onBlur={this.validateEmail}
                                onChange={e => {
                                    this.setState({
                                        email: {
                                            ...email,
                                            value: e.target.value
                                        }
                                    });
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                }
                                labelWidth={60}
                            />
                            <FormHelperText id="email-helper-text">
                                {email.helperText}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            error={!this.isBalanceValid()}
                            required
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-balance">
                                Balance
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-balance"
                                value={balance.value}
                                onBlur={this.validateBalance}
                                onChange={e => {
                                    this.setState({
                                        balance: {
                                            ...balance,
                                            value: e.target.value
                                        }
                                    });
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountBalance />
                                    </InputAdornment>
                                }
                                labelWidth={60}
                            />
                            <FormHelperText id="balance-helper-text">
                                {balance.helperText}
                            </FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-fees"
                                id="outlined-adornment-fees"
                            >
                                Fees
                            </InputLabel>
                            <Select
                                labelId="outlined-adornment-fees"
                                id="outlined-adornment-fees-select"
                                multiple
                                value={fees.value}
                                onChange={e => {
                                    this.setState({
                                        fees: { ...fees, value: e.target.value }
                                    });
                                }}
                                labelWidth={60}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LocalAtm />
                                    </InputAdornment>
                                }
                            >
                                {FEES.map(fee => (
                                    <MenuItem key={fee} value={fee}>
                                        {fee}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </CardContent>
                    <CardActions style={{ justifyContent: "flex-end" }}>
                        <Button onClick={this.props.onCancel}>Cancel</Button>
                        <Button color="primary" type="submit">
                            Add account
                        </Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

export default withFirebase(AccountForm);
