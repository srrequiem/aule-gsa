import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Login.css";
import FullscreenView from "../../containers/FullscreenView/FullscreenView";

class Login extends Component {
    state = {
        email: {
            value: '',
            helperText: ''
        },
        password: {
            value: '',
            helperText: ''
        }
    };

    onLogin = event => {
        event.preventDefault();
        console.log("Hola");
    };

    validateEmail = () => {
        const { email } = this.state;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validateEmailState = {...email, helperText: ''};
        if (!re.test(email.value)) {
            validateEmailState.helperText = 'You must enter a valid email address';
        }
        this.setState({ email: validateEmailState });
    }

    validatePassword = () => {
        const { password } = this.state;
        const validatePassState = {...password, helperText: ''};
        if (password.value.length < 1) {
            validatePassState.helperText = 'Please enter your password';
        }
        this.setState({ password: validatePassState });
    }

    render() {
        const { email, password } = this.state;
        return (
            <FullscreenView>
                <form className="LoginForm" onSubmit={this.onLogin}>
                    <h1>Login</h1>
                    <TextField
                        required
                        error={email.helperText !== ''}
                        helperText={email.helperText}
                        value={email.value}
                        onBlur={this.validateEmail}
                        onChange={e => this.setState({ email: {...email, value: e.target.value}})}
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                    <TextField
                        required
                        error={password.helperText !== ''}
                        helperText={password.helperText}
                        value={password.value}
                        onBlur={this.validatePassword}
                        onChange={e => this.setState({ password: {...password, value: e.target.value}})}
                        type="password"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>
            </FullscreenView>
        );
    }
}

export default Login;
