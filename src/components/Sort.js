import React from 'react';

const Sort = (props) => {
    return (
        <div className="sort-container">
            <div className="distance-sort">
                Distance:  
                {" "}
                <select >
                    <option value=""></option>
                    <option value="lowest">Closest</option>
                    <option value="highest">Furthest</option>
                </select>
            </div>
            <div className="rating-sort">
                Rating:
                {" "}
                <select >
                    <option value=""></option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="price-sort">
                Price:
                {" "}
                <select >
                    <option value=""></option>
                    <option value="lowest">Cheapest</option>
                    <option value="highest">Expensive</option>
                </select>
            </div>
        </div>
    )
}

export default Sort;