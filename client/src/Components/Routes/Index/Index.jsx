import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Jumbotron from './Jumbotron';
import Cards from './Cards';

const Index = () => {

    const [places, setPlaces] = useState([]);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        axios.get(`/api/places/`, {
            withCredentials: true
        })
            .then(res => {           
                setPlaces(res.data.places);
                setAuth(res.data.authenticated);
           
            })
    }, []);

    return (
        <div>
            <Jumbotron auth={auth}/>
            <Cards places={places}/>
        </div>
    )
}

export default Index;