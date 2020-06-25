import React from 'react';
import Button from 'react-bootstrap/Button';

const SearchBar = (props) => {
    // console.log(props);
    return (
        <div className="searchbar">
            <form>
                <div className="input-container">
                <div>
                    <label htmlFor="location">Location: </label>
                    <input id="location" name="location" type="text" placeholder="enter location" onChange={(e) => props.handleChange(e)}></input>
                </div>
                <div>
                    <label htmlFor="cuisine">Cuisine: </label>
                    <input type="text" id="cuisine" name="cuisine" placeholder="enter cuisine" onChange={(e) => props.handleChange(e)}></input>
                </div>
                </div>
                <div>
                    <Button variant="outline-light" onClick={props.handleClick}>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;