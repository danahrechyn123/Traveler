import React from 'react';
import './CreateTravel.css';
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, Input, Row, Col, CardDeck
} from 'reactstrap';

import ReactCardFlip from 'react-card-flip';

import { travelService } from '../../../services/TravelService';
import { dataService } from '../../../services/DataService';

class PlaceCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            isFlipped: false,
            isLiked: false
        };

        this.handleAddPlace = this.handleAddPlace.bind(this);
        this.GoBack = this.GoBack.bind(this);
    }


    handleAddPlace(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
       
    }

    GoBack(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        
    }



    render() {

        return (
            <div >
                <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack="1.3" flipSpeedBackToFront="1.3">

                    <Card key="front" className="place-card"   >
                            <CardHeader className="place-card-header">{parsePlaceType(this.props.placeType)}</CardHeader>
                            <CardBody>
                                <img src={this.props.imgUrl}
                                    width="250px" />
                                <br />
                                <div className="place-card-info">
                                    Name: {this.props.name}
                                    About: {this.props.about}
                                </div>
                            </CardBody>
                        <CardFooter onClick={this.handleAddPlace}>
                                <p  value={this.props.id} >Hide</p>
                            </CardFooter>
                       
                    </Card>

                    <Card key="back" className="place-card-back"  >
                        <CardHeader>The card id hidden</CardHeader>
                        <CardBody className="place-back-card-body">                         
                            {this.props.name}                           
                        </CardBody>
                        <CardFooter className="back-footer" onClick={this.GoBack} >
                            <p  className="back-footer-btn last">Show</p>
                        </CardFooter>
                    </Card>

                </ReactCardFlip>
            </div>
        );
    }
}

export default PlaceCard;


function parsePlaceType(id) {
    if (id === 0) { return "Restaurant"; }
    else if (id === 1) { return "Hotel"; }
    else if (id === 2) { return "Museum"; }
    else if (id === 3) { return "Monument"; }
    else if (id === 4) { return "Entertaiment"; }
    else { return "error" }
}
