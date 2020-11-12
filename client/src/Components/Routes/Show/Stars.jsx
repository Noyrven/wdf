import React from 'react';
 
const Stars = ({num}) => {
    const rating =[];
    for (let i=0; i < 5; i++) {
        rating.push(<i key={i} className="fas fa-star star-gray"></i>)              
    }
    for (let j=0; j < Math.ceil(num); j++) {
        rating.splice(j, 1, <i key={j} className="fas fa-star star-gold"></i>)
    }
    return rating
}

export default Stars;
