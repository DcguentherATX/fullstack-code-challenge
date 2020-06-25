import React from 'react';

const Restaurant = (props) => {
    return (
        <div>
            <img src={props.restaurant.image_url} alt={props.restaurant.name}/>
            <div>{props.restaurant.name}</div>
            <div>{props.restaurant.price}</div>
            <div>{props.restaurant.rating}</div>
        </div>
    )
}

export default Restaurant;