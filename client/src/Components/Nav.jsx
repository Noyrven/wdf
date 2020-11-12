import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from '../nav-logo.png'

const Nav = () => {

    const [user, setUser] = useState('');
    const [auth, setAuth] = useState(false);
  
    useEffect(() => {
        axios.get(`/api`, {withCredentials: true})
        .then(res => {
            setAuth(res.data.authenticated);
            setUser(res.data.user)
        })
    }, []); 


    const renderNav = () => {
        if (auth===false) {
            return (
                <>
                <li className="nav-item"><a className="nav-link" href="/login">Log in</a></li>
                <li className="nav-item"><a className="nav-link" href="/register">Sign Up</a></li>
                </>
            )
        } else {
            return (
                <>
                <li className='nav-item'> <span className="nav-link active" href="#">Hello, {user}</span></li>
                <li className="nav-item"><a className="nav-link" href="logout/">Log Out</a></li>
                </>
            )
        }
    } 


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav">
                <a className="navbar-brand" href="/places"><img id='logo' src={logo} alt="W>D&F"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">

                    {renderNav()}

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav;