import React from 'react';
import { Link } from 'react-router-dom';
import Stars from './Stars';

const MainInfo = ({ place, auth, user }) => {

    const url = `http://${place.menu}/`;
    const urlEdit = `${place._id}/edit`;
    let urlComment = ''
    auth ? urlComment = `${place._id}/comments/new` : urlComment = '/login'

    const edit = () => {
        if (auth && user._id === place.creator) {
            return (
                <a href={urlEdit}>
                    <i className="fas fa-edit"></i>
                </a>
            )
        } else {
            return (<></>)
        }
    };

    let ratings = 0;
    let reviews = 0;
    place.comments.map(comment => {
        return (ratings += comment.rating, reviews++)
    });
    let totalRating = ratings / place.comments.length;

    return (
        <div>
            <div className='img-cover'>
                <img src={place.image} alt=''/>
                <div className='cover-info'>
                    <h1>{place.name} {edit()} </h1>
                    <p><Stars num={totalRating} /> {totalRating.toFixed(1)}/5 ‧ ({reviews})</p>
                    <div className='row'>
                        <div className='col col-12 col-lg-6'>
                            <p><i className="fas fa-utensils"></i>{place.price} ‧ {place.cuisine}</p>
                            <p><i className="fas fa-map-marker-alt"></i>{place.address}</p>
                            <p><i className="fas fa-clock"></i>{place.opened}</p>
                        </div>
                        <div className='col col-12 col-lg-6'>
                            <p><i className="fas fa-globe-americas"></i><a className='site-a' href={url}>{place.menu}</a></p>
                            <p><i className="fas fa-phone"></i>{place.telephone}</p>
                            <Link className='link' to={urlComment}> <i className="fas fa-angle-right"></i>   Leave a review   </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainInfo;