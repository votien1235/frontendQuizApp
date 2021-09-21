import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
export const Loading = (props) => {
    return (
        <div className="my-3 d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>{props.text}</p>
        </div>
    )
}