import React from 'react';
import Restaurant from './Restaurant';
import CardDeck from 'react-bootstrap/CardDeck';

const Restaurants = ( {restaurants, addToCrawl }) => {
    // console.log('props', props);

    return (
            <div className='card-deck-container'>
                <CardDeck>
                    {restaurants.map((restaurant, index) => (
                        <Restaurant key={index} restaurant={restaurant} addToCrawl={addToCrawl} />
                    ))}
                </CardDeck>
            </div>
    )
}

export default Restaurants;