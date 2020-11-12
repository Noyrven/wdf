import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

const Logout = () => {

    const [status, setStatus] = useState('')

    useEffect(() => {
        axios.get(`api/logout`, {withCredentials: true})
        .then(res => setStatus(res.status))
    }, []);

    const renderRedirect = () => {
        if(status===200) {
            return <Redirect to='/places' />
        } else {
            return  <Redirect to='/logout' />
        }
    }

    return(
       <>
       {renderRedirect()}
       </>
    )
};


export default Logout;