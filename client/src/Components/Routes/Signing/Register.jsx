import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";

const Register = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    const submit = e => {
        e.preventDefault();
        axios.post(`api/register`, { username: user.username, password: user.password }, {withCredentials: true})
            .then(res => { if (res.status === 200) setRedirect(true) })
            .catch(e => alert(e))
    };

    const renderRedirect = () => {
        if (redirect) return <Redirect to='/places' />
    };


    return (
        <>
            {renderRedirect()}
            <div className="container text-center mt-5">
                <h1>SIGN UP</h1>
                <p>Create an account for a full access to the features</p>
                <div className="form-size">
                    <form onSubmit={submit}>
                    <div className="form__group field">
                            <input type="input" className="form__field" placeholder="Name" name="name" id='name' required onChange={e => setUser({ ...user, username: e.target.value })} />
                            <label htmlFor="name" className="form__label">Username</label>
                        </div>

                        <div className="form__group field">
                            <input type="password" className="form__field" placeholder="Password" name="password" id='password' required onChange={e => setUser({ ...user, password: e.target.value })} />
                            <label htmlFor="password" className="form__label">Password</label>
                        </div>

                        <div className="form-group">
                            <input id="btn" className="btn btn-primary btn-block" type='submit' value='Sign Up' />
                        </div>

                    </form>
                    <p>Already have an account? Log in <a className='site-a' href="/login">here</a>.</p>
                </div>
            </div>
        </>
    )
}

export default Register;
