import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

const RestaurantModal = ({ show, onHide, restaurant, handleClose, addToCrawl}) => {
    // console.log(addToCrawl);

   return (
       <div>
           <Modal show={show} onHide={onHide}
               aria-labelledby="contained-modal-title-vcenter" size="lg"
               centered>

               <Modal.Header closeButton>
                   <Modal.Title id="modalTitle">{restaurant.name}
                   </Modal.Title>
               </Modal.Header>

               <Modal.Body>
                   <Container>
                       <Row className="top-row">
                           <Col md={12} lg={6} className="layout-box">
                           <div className="modal-img-container">
                               <img className="modal-img" src={restaurant.image_url} />
                           </div>
                           </Col>
                           <Col md={12} lg={6} className="layout-box">
                           <div className="rest-details">
                                <div className="modal-info">
                                    <h6>Address: </h6>
                                    <div className="addy">
                                        <span>{restaurant.location.display_address[0]}</span>
                                        <span>{restaurant.location.display_address[1]}</span>
                                        <span>{restaurant.location.display_address[2]}</span>
                                    </div>
                                </div>
                                <div className="modal-info">
                                    <h6>Phone: </h6>
                                        <span>{restaurant.display_phone}</span>
                                </div>
                                <div className="modal-info">
                                    <h6>Rating: </h6>
                                        <span>
                                            <StarRatings
                                                rating={restaurant.rating}
                                                starRatedColor="#fe9720"
                                                starDimension="1rem"
                                                starSpacing=".1rem"
                                                numberOfStars={5}
                                                name="rating"
                                            />
                                        </span>
                                </div>
                                <div className="modal-info">
                                    <h6>Price: </h6>
                                        <span>{restaurant.price}</span>
                                </div>
                                <div className="modal-info">
                                    <h6>Phone: </h6>
                                        <span>{restaurant.display_phone}</span>
                                </div>
                                <div className="modal-info">
                                    <h6>Website: </h6>
                                    <a href={restaurant.url} target="_blank">
                                        <span>Visit {restaurant.name}</span>
                                    </a>
                                </div>
                               </div>
                           </Col>
                       </Row>
                   </Container>
               </Modal.Body>

               <Modal.Footer>
               <Button variant="primary" value={restaurant.id} onClick={(e) => addToCrawl(e)}>
                       Add to Tour
               </Button>
                   <Button variant="primary" onClick={handleClose}>
                       Close
               </Button>
               </Modal.Footer>

           </Modal>
       </div>
   )
}

export default RestaurantModal;