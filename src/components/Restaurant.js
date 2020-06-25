import React from 'react';

const Restaurant = (props) => {
    return (
        <div>
            <div>{props.restaurant.name}</div>
            <div>{props.restaurant.price}</div>
            <div>{props.restaurant.rating}</div>
        </div>
    )
}

export default Restaurant;