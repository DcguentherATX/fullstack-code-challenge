import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';

const Restaurant = (props) => {
    return (
        <div className="card-container">
            <Card style={{ width: '22rem' }}>
                <div className="card-img-container">
                    <Card.Img variant="top" src={props.restaurant.image_url} />
                </div>
                <Card.Body>
                    <Card.Title><strong>{props.restaurant.name}</strong></Card.Title>
                    <div className="rating-container">
                        <span className="rating">Rating:</span>
                        <span>
                            <StarRatings
                                rating={props.restaurant.rating}
                                starRatedColor="#fe9720"
                                starDimension="1rem"
                                starSpacing=".1rem"
                                numberOfStars={5}
                                name="rating"
                            />
                        </span>
                    </div>
                    <span>
                        Price: {props.restaurant.price}
                    </span>
                    <div className="card-buttons">
                        <Button variant="outline-light">
                            More Info
                        </Button>
                        <Button variant="outline-light" value={props.restaurant.id} onClick={(e) => props.addToCrawl(e)}>
                            Add to Crawl
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Restaurant;