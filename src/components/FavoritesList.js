import React from 'react';
import Fade from 'react-reveal/Fade';

const FavoritesList = (props) => {
    // console.log(props.fav[0]);
    let listName = '';
    let imageUrl = '';
    let location = '';
    let stops = 0;

    if (props.fav.length > 0) {
        listName = (props.fav[props.fav.length - 1]);
        imageUrl = (props.fav[0].image_url);
        location = `${props.fav[0].location.city}, ${props.fav[0].location.state}`;
        stops = props.fav.length - 1;
    };

    return (
        <Fade top cascade>
        <div className="tour-list">
            <div>
                <img className="crawl-image" src={imageUrl} />
            </div>
            <div className="fav-list-details">
                <strong>Name: {listName}</strong>
                <div>Location: {location}</div> 
                <div>Stops: {stops}</div>
            </div>
        </div>
        </Fade>
    )
}

export default FavoritesList;