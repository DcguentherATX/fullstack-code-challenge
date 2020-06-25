import React from 'react';
import Card from 'react-bootstrap/Card';

const Restaurant = (props) => {
    return (
        <div>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={props.restaurant.image_url} />
                <Card.Body>
                    <Card.Title>{props.restaurant.name}</Card.Title>
                    <Card.Text>
                        <div>
                            {props.restaurant.rating}
                        </div>
                        <div>
                            {props.restaurant.price}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Restaurant;