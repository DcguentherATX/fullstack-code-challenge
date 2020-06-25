import React from 'react';
import Restaurant from './Restaurant';

const Restaurants = (props) => {
    // console.log('props', props);

    return (
        <div>
            {props.restaurants.map((restaurant, index) => (
                <Restaurant key={index} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default Restaurants;