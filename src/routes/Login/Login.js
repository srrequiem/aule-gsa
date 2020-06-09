import React from "react";
import { withUnauthentication } from "../../hoc/Auth";
import FullscreenView from "../../containers/FullscreenView/FullscreenView";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => (
    <FullscreenView>
        <LoginForm />
    </FullscreenView>
);

export default withUnauthentication(Login);
