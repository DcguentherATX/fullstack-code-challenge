import React from 'react';
import Restaurant from './Restaurant';
import CardDeck from 'react-bootstrap/CardDeck';
import Fade from 'react-reveal/Fade';

const Restaurants = (props) => {
    // console.log('props', props);

    return (
            <div className='card-deck-container'>
                <CardDeck>
                    <Fade>
                    {props.restaurants.map((restaurant, index) => (
                        <Restaurant key={index} restaurant={restaurant} addToCrawl={props.addToCrawl} />
                    ))}
                    </Fade>
                </CardDeck>
            </div>
    )
}

export default Restaurants;