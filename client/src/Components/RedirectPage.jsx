import React from 'react';
import { Redirect } from 'react-router-dom'

const RedirectPage = () => {
    return (
        <Redirect to='/places' />
    )
}

export default RedirectPage