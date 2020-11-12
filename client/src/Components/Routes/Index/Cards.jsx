import React from 'react';

const Cards = ({places}) => {
    
    return (
        <div className='container-fluid'>
            <div className='row text-center align-items-stretch'>
                {places.map(place =>
                    <div key={place._id} className='col col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='card'>
                            <a href={`places/${place._id}`}>
                                <img className='img-fluid' src={place.image} alt="..." />
                            </a>
                            <a className='card-link row' href={`places/${place._id}`}>
                                <h5>{place.name}</h5>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cards;