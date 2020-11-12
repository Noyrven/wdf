import React from 'react';
import Stars from './Stars';
import Mapbox from './Mapbox';
import * as dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const AdditionalInfo = ({ place }) => {


    const renderPros = pros => {
        if(pros) return (<p className='pros'><span>Pros: </span>{pros}</p>)
    }
    const renderCons = cons => {
        if(cons) return (<p className='cons'><span>Cons: </span>{cons}</p>)
    }


    return (
        <div>
            <div className='row align-items-stretch'>
                <div className='col col-12 col-md-6 order-2 order-md-1'>
                    <h3 className='rev'>Latest reviews</h3>
                    {place.comments && place.comments.map(comment =>
                        <div key={comment._id} className='comment'>
                            <p className='author'>{comment.author.username}</p>
                            <p className='date'>{dayjs(comment.date).fromNow()}</p>
                            <p className='rating'> <Stars num={comment.rating} /> {comment.rating.toFixed(1)}/5</p>
                            <p className='text'>{comment.text}</p>
                            {renderPros(comment.pros)}
                            {renderCons(comment.cons)}
                            <hr/>
                        </div>
                    )}
                </div>
                <div className='col col-12 col-md-6 order-1 order-md-2'>
                    <Mapbox place={place}/>
                </div>
            </div>
        </div>
    )
};

export default AdditionalInfo;