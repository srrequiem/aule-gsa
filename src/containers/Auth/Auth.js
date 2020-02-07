import React, { Component } from "react";
import { TextField } from "@material-ui/core";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    render() {
        return (
            <form>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
            </form>
        );
    }
}

export default Auth;
