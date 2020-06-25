import React from 'react';
import Restaurant from './Restaurant';
import CardDeck from 'react-bootstrap/CardDeck';

const Restaurants = (props) => {
    // console.log('props', props);

    return (
        <div>
            <h3>Showing results for <strong>{props.cuisine}</strong> in <strong>{props.location}</strong></h3>
            <div className='card-deck-container'>
                <CardDeck>
                    {props.restaurants.map((restaurant, index) => (
                        <Restaurant key={index} index={index} restaurant={restaurant} addToCrawl={props.addToCrawl} />
                    ))}
                </CardDeck>
            </div>
        </div>
    )
}

export default Restaurants;