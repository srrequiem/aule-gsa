import React, { createContext } from 'react';
import { withFirebase } from "./FirebaseContext";

const AuthUserContext = createContext(null);

export const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        state = {
            authUser: null,
        };

        componentDidMount() {
          this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
              authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
            },
          );
        }
        componentWillUnmount() {
          this.listener();
        }
        render() {
          return (
            <AuthUserContext.Provider value={this.state.authUser}>
              <Component {...this.props} />
            </AuthUserContext.Provider>
          );
        }
      }
      return withFirebase(WithAuthentication);
};

export default AuthUserContext;