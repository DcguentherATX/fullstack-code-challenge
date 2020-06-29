import React from 'react';
import Button from 'react-bootstrap/Button';

const SearchBar = ({ handleChange, handleClick }) => {
    // console.log(props);
    return (
        <div className="searchbar">
            <form>
                <div className="input-container">
                <div>
                    <label htmlFor="cuisine">Cuisine: </label>
                    <input type="text" id="cuisine" name="cuisine" placeholder="enter cuisine" required="required" onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label htmlFor="location">Location: </label>
                    <input id="location" name="location" type="text" placeholder="enter location" required="required" onChange={(e) => handleChange(e)}></input>
                </div>
                <div>
                    <label htmlFor="radius">Distance: </label>
                    <input type="number" min="5000" max="40000" step="1000" id="radius" name="radius" placeholder="enter search distance (< 40000)" onChange={(e) => handleChange(e)}></input>
                </div>
                </div>
                <div>
                    <Button variant="outline-light" onClick={handleClick}>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;