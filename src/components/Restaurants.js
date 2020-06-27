import React from 'react';
import Restaurant from './Restaurant';
import CardDeck from 'react-bootstrap/CardDeck';

const Restaurants = (props) => {
    console.log('props', props);

    return (
            <div className='card-deck-container'>
                <CardDeck>
                    {props.restaurants.map((restaurant, index) => (
                        <Restaurant key={index} restaurant={restaurant} addToCrawl={props.addToCrawl} />
                    ))}
                </CardDeck>
            </div>
    )
}

export default Restaurants;