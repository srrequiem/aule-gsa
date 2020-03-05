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
    LocalAtm,
    AttachMoney,
    DateRange,
    AlarmAdd,
    AddAlert,
    Today
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

import { isFloatValid, isIntValid } from "../../utils/Validation";
import { withFirebase } from "../../hoc/FirebaseContext";

const REMINDERS = ["Email", "SMS"];
class FeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                helperText: ""
            },
            amount: {
                value: 0,
                helperText: ""
            },
            concurrency: {
                value: 30,
                helperText: ""
            },
            triggerDate: {
                value: new Date(),
                helperText: ""
            },
            reminderConcurrency: {
                value: 0,
                helperText: ""
            },
            reminders: {
                value: [],
                helperText: ""
            }
        };
    }

    onFeeCreation = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            const {
                name,
                amount,
                concurrency,
                reminderConcurrency,
                reminders
            } = this.state;
            const fee = {
                name: name.value,
                amount: parseFloat(amount.value),
                concurrency: parseInt(concurrency.value),
                reminderConcurrency: parseInt(reminderConcurrency.value),
                reminders: reminders.value
            };
            this.props.firebase
                .saveFee(fee)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
    };

    isFormValid = () => {
        return (
            this.isNameValid() &&
            this.isAmountValid() &&
            this.isConcurrencyValid() &&
            this.isReminderConcurrencyValid()
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

    isAmountValid = () => {
        const { amount } = this.state;
        return amount.helperText === "";
    };

    validateAmount = () => {
        const { amount } = this.state;
        const validateAmountState = {
            value: parseFloat(amount.value),
            helperText: ""
        };
        if (!isFloatValid(amount.value)) {
            validateAmountState.helperText = "You must enter a valid number";
        }
        this.setState({ amount: validateAmountState });
    };

    isConcurrencyValid = () => {
        const { concurrency } = this.state;
        return concurrency.helperText === "";
    };

    validateConcurrency = () => {
        const { concurrency } = this.state;
        const validateConcurrencyState = {
            value: parseInt(concurrency.value),
            helperText: ""
        };
        if (!isIntValid(concurrency.value)) {
            validateConcurrencyState.helperText =
                "You must enter a valid number";
        }
        this.setState({ concurrency: validateConcurrencyState });
    };

    isReminderConcurrencyValid = () => {
        const { reminderConcurrency } = this.state;
        return reminderConcurrency.helperText === "";
    };

    validateReminderConcurrency = () => {
        const { reminderConcurrency } = this.state;
        const validateReminderConcurrencyState = {
            value: parseInt(reminderConcurrency.value),
            helperText: ""
        };
        if (!isIntValid(reminderConcurrency.value)) {
            validateReminderConcurrencyState.helperText =
                "You must enter a valid number";
        }
        this.setState({
            reminderConcurrency: validateReminderConcurrencyState
        });
    };

    render() {
        const {
            name,
            amount,
            concurrency,
            triggerDate,
            reminderConcurrency,
            reminders
        } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={this.onFeeCreation}>
                    <Card>
                        <CardHeader title={"New fee"} />
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
                                            name: {
                                                ...name,
                                                value: e.target.value
                                            }
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
                                    onChange={e => {
                                        this.setState({
                                            amount: {
                                                ...amount,
                                                value: e.target.value
                                            }
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
                            <FormControl
                                error={!this.isConcurrencyValid()}
                                required
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-concurrency">
                                    Concurrency
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-concurrency"
                                    value={concurrency.value}
                                    onBlur={this.validateConcurrency}
                                    onChange={e => {
                                        this.setState({
                                            concurrency: {
                                                ...concurrency,
                                                value: e.target.value
                                            }
                                        });
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <DateRange />
                                        </InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                                <FormHelperText id="concurrency-helper-text">
                                    {concurrency.helperText}
                                </FormHelperText>
                            </FormControl>
                            <KeyboardDatePicker
                                required
                                inputVariant="outlined"
                                id="date-picker-dialog"
                                label="Trigger Date"
                                format="MM/dd/yyyy"
                                value={triggerDate.value}
                                onChange={date => {
                                    this.setState({
                                        triggerDate: {
                                            ...triggerDate,
                                            value: date
                                        }
                                    });
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                            <FormControl
                                error={!this.isReminderConcurrencyValid()}
                                required
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-reminder-concurrency">
                                    Reminder Concurrency
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-reminder-concurrency"
                                    value={reminderConcurrency.value}
                                    onBlur={this.validateReminderConcurrency}
                                    onChange={e => {
                                        this.setState({
                                            reminderConcurrency: {
                                                ...reminderConcurrency,
                                                value: e.target.value
                                            }
                                        });
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AlarmAdd />
                                        </InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                                <FormHelperText id="reminder-concurrency-helper-text">
                                    {reminderConcurrency.helperText}
                                </FormHelperText>
                            </FormControl>
                            <FormControl variant="outlined">
                                <InputLabel
                                    htmlFor="outlined-adornment-reminders"
                                    id="outlined-adornment-reminders"
                                >
                                    Reminders
                                </InputLabel>
                                <Select
                                    labelId="outlined-adornment-reminders"
                                    id="outlined-adornment-reminders-select"
                                    multiple
                                    value={reminders.value}
                                    onChange={e => {
                                        this.setState({
                                            reminders: {
                                                ...reminders,
                                                value: e.target.value
                                            }
                                        });
                                    }}
                                    labelWidth={60}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AddAlert />
                                        </InputAdornment>
                                    }
                                >
                                    {REMINDERS.map(reminder => (
                                        <MenuItem
                                            key={reminder}
                                            value={reminder}
                                        >
                                            {reminder}
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

export default withFirebase(FeeForm);
