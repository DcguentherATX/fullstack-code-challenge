import React from 'react';

const Sort = ({ sortResults, filterProducts }) => {
    return (
        <div className="sort-container">
            <div className="distance-sort">
                Sort By:  
                {" "}
                <select onChange={(e) => sortResults(e)}>
                    <option value="default">Default</option>
                    <option value="closest">Closest</option>
                    <option value="furthest">Furthest</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="highest">Highest Rated</option>
                    <option value="cheapest">Cheapest</option>
                    <option value="expensive">Most Expensive</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>
            <div className="filter-rating">
                Filter Rating:
                {" "}
                <select value="rating" onChange={filterProducts}>
                    <option value=""></option>
                    <option value="rating-1">1 Star</option>
                    <option value="rating-2">2 Stars</option>
                    <option value="rating-3">3 Stars</option>
                    <option value="rating-4">4 Stars</option>
                    <option value="rating-5">5 Stars</option>
                    <option value="rating-all">All</option>
                </select>
            </div>
            <div className="filter-price">
                Filter Price:
                {" "}
                <select value="rating" onChange={filterProducts}>
                    <option value=""></option>
                    <option value="price-1">1 Dollar Sign</option>
                    <option value="price-2">2 Dollar Signs</option>
                    <option value="price-3">3 Dollar Signs</option>
                    <option value="price-4">4 Dollar Signs</option>
                    <option value="price-all">All</option>
                </select>
            </div>
            
            {/* <div className="rating-sort">
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
            </div> */}
        </div>
    )
}

export default Sort;