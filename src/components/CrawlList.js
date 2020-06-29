import React from 'react';
import StarRatings from 'react-star-ratings';
import Fade from 'react-reveal/Fade';
import convertToDollars from '../util';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';
import remove from '../../images/remove-button.png';


const CrawlList = ({ crawl, deleteCrawlItem, swap }) => {
    // console.log(props);
    return (
        <div className="crawl-list">
            {crawl.map((crawlItem, index) => (
                <Fade right cascade key={index}>
                <div className="crawl-item" key={index} >
                    <div className="crawl-info">
                    <img className="crawl-image" src={crawlItem.image_url} alt={crawlItem.name} />
                    <div>
                        <div className="clip">{crawlItem.name}</div>
                        <div>{convertToDollars(crawlItem.price)}</div>
                        <StarRatings
                                rating={crawlItem.rating}
                                starRatedColor="#fe9720"
                                starDimension="1rem"
                                starSpacing=".1rem"
                                numberOfStars={5}
                                name="rating"
                        />
                    </div>
                    </div>
                    <div className="crawl-button-list" index={index} >
                    <OverlayTrigger
                        key={'up'}
                        placement={'left'}
                        overlay={
                        <Tooltip id={`tooltip-left`}>
                            Move Item Up
                        </Tooltip>
                        }
                    >
                    <img onClick={(e) => swap(e)} value="up" src={upArrow} alt="upArrow" />
                    </OverlayTrigger>
                    <OverlayTrigger 
                        key={'remove'}
                        placement={'left'}
                        overlay={
                            <Tooltip id={'tooltip-left'} >
                                Remove Item
                            </Tooltip>
                        }>
                        <img onClick={(e) => deleteCrawlItem(e)} value="remove" src={remove} alt="remove-button" />
                        </OverlayTrigger>
                        <OverlayTrigger
                            key={'down'}
                            placement={'left'}
                            overlay={
                                <Tooltip id={'tooltip-left'}>
                                    Move Item Down
                                </Tooltip>
                            }>
                            <img onClick={(e) => swap(e)} value="down" src={downArrow} alt="downArrow" />
                        </OverlayTrigger>
                    </div>                                   
                </div>
            </Fade> 
            ))}
        </div>
    )
}

export default CrawlList;