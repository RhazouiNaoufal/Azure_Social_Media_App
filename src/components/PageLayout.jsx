import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ViewPostsButton } from "./ViewPostsButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">Cloud Native</a>
                { isAuthenticated ? <SignOutButton />:<SignInButton /> }
                { isAuthenticated ? <ViewPostsButton />: <SignInButton/>}
            </Navbar>
            <h5><center>Welcome to my Cloud Native Web Application</center></h5>
            <br />
            <br />
            {props.children}
        </>
    );
};

