import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AuthUserContext from "./AuthUserContext";
import { withFirebase } from "../FirebaseContext";
import { Routes } from "../../constants/Routes";

const withUnauthentication = Component => {
    class WithUnauthentication extends React.Component {
        state = {
            loadHasFinish: false
        };
        
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (authUser) {
                        this.props.history.push(Routes.DASHBOARD);
                        return;
                    }
                    this.setState({ loadHasFinish: true });
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            const { loadHasFinish } = this.state;
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        !authUser && loadHasFinish ? (
                            <Component {...this.props} />
                        ) : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }
    return compose(withRouter, withFirebase)(WithUnauthentication);
};

export default withUnauthentication;
