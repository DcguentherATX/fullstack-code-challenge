import React from 'react';

const CrawlList = (props) => {
    console.log(props);
    return (
        <div className="crawl-list">
            {props.crawl.map((crawlItem, index) => (
                <div className="crawl-item" key={index}>
                    <div className="crawl-info">
                    <img className="crawl-image" src={crawlItem.image_url} alt={crawlItem.name} />
                    <div>
                        <div>{crawlItem.name}</div>
                        <div>{crawlItem.price}</div>
                        <div>{crawlItem.rating}</div>
                    </div>
                    </div>
                    <div className="crawl-button-list">
                        <button>Up</button>
                        <button>Remove</button>
                        <button>Down</button>
                    </div>                
                </div>
            ))}
        </div>
    )
}

export default CrawlList;