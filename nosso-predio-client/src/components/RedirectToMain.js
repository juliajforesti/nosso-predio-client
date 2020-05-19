import React from 'react';
import { Redirect } from "react-router-dom";


const RedirectToMain = _ => {
    return (
        <Redirect to="/" />
    );
}

export default RedirectToMain