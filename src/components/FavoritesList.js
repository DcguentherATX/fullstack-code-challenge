import React from 'react';
import Fade from 'react-reveal/Fade';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import remove from '../../images/remove-button.png';


const FavoritesList = (props) => {
    // console.log(props.fav[0]);
    let listName = (props.fav[props.fav.length - 1]);
    let imageUrl = (props.fav[0].image_url);
    let location = `${props.fav[0].location.city}, ${props.fav[0].location.state}`;
    let stops = props.fav.length - 1;

    // if (props.fav.length > 0) {
        // listName = (props.fav[props.fav.length - 1]);
        // imageUrl = (props.fav[0].image_url);
        // location = `${props.fav[0].location.city}, ${props.fav[0].location.state}`;
        // stops = props.fav.length - 1;
    // };

    return (
        <Fade top cascade>
        <div className="tour-list">
            <div className="tour-info">
            <div>
                <img className="crawl-image" src={imageUrl} />
            </div>
            <div className="fav-list-details">
                <strong>Name: {listName}</strong>
                <div>Location: {location}</div> 
                <div>Stops: {stops}</div>
            </div>
            </div>
            <div className="fav-btn-list">
            <OverlayTrigger 
                        key={'remove'}
                        placement={'left'}
                        overlay={
                            <Tooltip id={'tooltip-left'} >
                                Remove Item
                            </Tooltip>
                        }>
                        <img onClick={(e) => props.deleteTour(e)} value={props.index} src={remove} alt="remove-button" />
            </OverlayTrigger>
            </div>
        </div>
        </Fade>
    )
}

export default FavoritesList;