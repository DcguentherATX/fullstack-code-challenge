import React from 'react';

const Sort = (props) => {
    return (
        <div className="sort-container">
            <div className="distance-sort">
                Distance:  
                {" "}
                <select onChange={(e) => props.sortResults(e)}>
                    <option value="default">Default</option>
                    <option value="closest">Closest</option>
                    <option value="furthest">Furthest</option>
                </select>
            </div>
            <div className="rating-sort">
                Rating:
                {" "}
                <select onChange={(e) => props.sortResults(e)}>
                    <option value="default">Default</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="price-sort">
                Price:
                {" "}
                <select onChange={(e) => props.sortResults(e)}>
                    <option value="default">Default</option>
                    <option value="cheapest">Cheapest</option>
                    <option value="expensive">Expensive</option>
                </select>
            </div>
            <div className="name-sort">
                Name:
                {" "}
                <select onChange={(e) => props.sortResults(e)}>
                    <option value="default">Default</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>
        </div>
    )
}

export default Sort;