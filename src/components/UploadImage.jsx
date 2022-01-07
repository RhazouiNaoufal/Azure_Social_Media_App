import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ViewPostsButton } from "./ViewPostsButton";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */

export const UploadPost = (props) => {
    return (
        <>
        <div className="container">
                <div className="row align-items-start">
                    <div className="col-2" />
                    <div className="col-8" style={{textAlign: 'center'}}>
                        <h3>Upload Post</h3>
                    </div>
                    <div className="col-2" />
                    </div>
                    <div className="row align-items-start">
                    <div className="col-2" />
                    <div className="col-8" style={{textAlign: 'left', borderBottom: '1px solid #222222'}}>
                        <p>Upload Post</p>
                        <form style={{fontSize: '10pt'}} id="newAssetForm">
                        <div className="mb-3">
                            <label htmlFor="FileName" className="form-label">File Name</label>
                            <input type="text" className="form-control" id="FileName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userID" className="form-label">User Id</label>
                            <input type="string" className="form-control" id="userID" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="userName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="UpFile" className="form-label">File to Upload</label>
                            <input type="file" className="form-control" id="UpFile" />
                        </div>
                        <button type="button" id="subNewForm" className="btn btn-primary">Post</button> <br /><br />
                        </form>
                    </div>
                    <div className="col-2" />
                    </div>
                        <div className="row align-items-start">
                            <div className="col-2" />
                                <div className="col-8" style={{textAlign: 'left'}}>
                                    <div id="ImageList">
                                    </div>
                                </div>
                            <div className="col-2" />
                    </div>
            </div>
            {props.children}
        </>
    );
};  