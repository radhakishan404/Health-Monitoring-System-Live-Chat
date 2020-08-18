import React from "react";
import logo from '../logo.svg';

function Loader(props) {

    return (
        <div id="loader-wrapper">
            <div className="loader">
                <img src={logo} alt="Health Monitoring Logo" />
                <h2>Please Wait...</h2>
            </div>
        </div>
    )
}

export default Loader;