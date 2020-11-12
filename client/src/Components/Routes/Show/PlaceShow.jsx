import React, { useEffect, useState } from 'react';
import MainInfo from './MainInfo';
import AdditionalInfo from './AdditionalInfo';
import axios from 'axios';

const PlaceShow = ({ match }) => {
    const id = match.params.id;
    const url = `/api/places/${id}`;


    const [place, setPlace] = useState({
        location: {
            coordinates: [0, 0]
        },
        comments: [{
            _id: '',
            rating: 0,
            author: {}
        }]
    });
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({_id: '', username: ''})

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                setPlace(res.data.place);
                setIsAuth(res.data.authenticated);
                setUser(res.data.user);
            })
    }, [url]);

    return (
        <div>
            <MainInfo place={place} auth={isAuth} user={user}/>
            <AdditionalInfo place={place} auth={isAuth} />
        </div>
    )
};

export default PlaceShow;