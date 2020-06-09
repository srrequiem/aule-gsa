import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import AuthUserContext from "./AuthUserContext" ;
import { withFirebase } from "../FirebaseContext";
import { Routes } from "../../constants/Routes";

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(Routes.LOGIN);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
              <AuthUserContext.Consumer>
                {authUser =>
                  condition(authUser) ? <Component {...this.props} /> : null
                }
              </AuthUserContext.Consumer>
            );
          }
    }
    return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
