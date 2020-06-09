import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../constants/Routes";

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={Routes.SIGN_UP}>Sign Up</Link>
    </p>
);

export default SignUpLink;
