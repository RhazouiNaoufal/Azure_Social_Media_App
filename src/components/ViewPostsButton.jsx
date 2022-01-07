import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

export const ViewPostsButton = () => {
    const { instance } = useMsal();

    return (
        <div className="col-8" style={{textAlign: 'right'}}>
            <div style={{padding: '5px'}}>
                <button id="retImages" type="button" className="btn btn-primary" color="grey">View Posts</button>
            </div>
        </div>
    );
}