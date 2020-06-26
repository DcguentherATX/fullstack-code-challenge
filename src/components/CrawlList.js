import React from 'react';
import StarRatings from 'react-star-ratings';
import Fade from 'react-reveal/Fade';

import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';
import remove from '../../images/remove-button.png';


const CrawlList = (props) => {
    // console.log(props);
    return (
        <div className="crawl-list">
            {props.crawl.map((crawlItem, index) => (
                <Fade right cascade>
                <div className="crawl-item" key={index}>
                    <div className="crawl-info">
                    <img className="crawl-image" src={crawlItem.image_url} alt={crawlItem.name} />
                    <div>
                        <div className="clip">{crawlItem.name}</div>
                        <div>{crawlItem.price}</div>
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
                    <div className="crawl-button-list">
                        <img src={upArrow} alt="upArrow" />
                        <img src={remove} alt="remove-button" />
                        <img src={downArrow} alt="downArrow" />
                    </div>                                   
                </div>
            </Fade> 
            ))}
        </div>
    )
}

export default CrawlList;