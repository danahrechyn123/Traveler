import React from 'react';
import './CreateTravel.css';
import {
    Card, CardHeader, CardFooter, CardBody
} from 'reactstrap';

import ReactCardFlip from 'react-card-flip';
import { adminService } from '../../services/AdminService';
import { placeService } from '../../services/PlaceService';

class PlaceCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionPhrase:'',
            isFlipped: false,
            isLiked: false
        };
        
        this.GoBack = this.GoBack.bind(this);
        this.AcceptPlace = this.AcceptPlace.bind(this);
        this.DeletePlace = this.DeletePlace.bind(this);
        this.SavePlace = this.SavePlace.bind(this);
    }


   

    GoBack(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        
    }

    AcceptPlace() {
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped,
            actionPhrase: 'The cart was accepted!'
        }));
        adminService.acceptPlace(this.props.id);
    }

    DeletePlace() {
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped,
            actionPhrase: 'The cart was declined!'
        }));

        adminService.deletePlace(this.props.id);
    }

    SavePlace() {
        placeService.addPlaceToTravel(this.props.id, this.props.travelId);
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped,
            actionPhrase: 'The cart was saved!'
        }));
    }

    DeletePlaceFromTravel = () => {
        placeService.deletePlaceFromTravel(this.props.id, this.props.travelId);
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped,
            actionPhrase: 'The cart was saved!'
        }));
    }

    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        if (currentUser.role === 1) {
            if (this.props.status === 0) {
                return (
                    <div >
                        <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack="1.3" flipSpeedBackToFront="1.3">

                            <Card key="front" className="place-card admin" >
                                <CardHeader className="place-card-header" onClick={this.AcceptPlace}>Accept</CardHeader>
                                <CardBody>
                                    <img src={this.props.imgUrl}
                                        width="250px" />
                                    <br />
                                    <div className="place-card-info">
                                        Name: {this.props.name}
                                        About: {this.props.about}
                                    </div>
                                </CardBody>
                                <CardFooter onClick={this.DeletePlace}>
                                    <p>Decline</p>
                                </CardFooter>

                            </Card>

                            <Card key="back" className="place-card-back"  >
                                <CardHeader>{parsePlaceType(this.props.placeType)}</CardHeader>
                                <CardBody className="place-back-card-body">
                                    {this.state.actionPhrase}
                                </CardBody>
                                <CardFooter className="back-footer"  >
                                    {this.props.name}
                                </CardFooter>
                            </Card>

                        </ReactCardFlip>
                    </div>
                );
            }
            else {
                return (
                    <div >
                        <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack="1.3" flipSpeedBackToFront="1.3">

                            <Card key="front" className="place-card admin" >
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
                                <CardFooter onClick={this.DeletePlace}>
                                    <p>Delete</p>
                                </CardFooter>

                            </Card>

                            <Card key="back" className="place-card-back"  >
                                <CardHeader>{parsePlaceType(this.props.placeType)}</CardHeader>
                                <CardBody className="place-back-card-body">
                                    {this.props.name}
                                </CardBody>
                                <CardFooter className="back-footer"  >
                                    The card was deleted
                                </CardFooter>
                            </Card>

                        </ReactCardFlip>
                    </div>
                );
            }
        }
        
        else {
            if (this.props.for === "travel-list-place") {
                if (this.props.status === "Saved") {
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
                                    <CardFooter onClick={this.DeletePlaceFromTravel}>
                                        <p>Delete</p>
                                    </CardFooter>

                                </Card>

                                <Card key="back" className="place-card-back"  >
                                    <CardHeader>{parsePlaceType(this.props.placeType)}</CardHeader>
                                    <CardBody className="place-back-card-body">
                                        <p> {this.props.name} was deleted from current travel! </p>
                                    </CardBody>
                                    <CardFooter className="back-footer"  >
                                        <p className="back-footer-btn last">Deleted!</p>
                                    </CardFooter>
                                </Card>

                            </ReactCardFlip>
                        </div>
                    );
                }
                else {
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
                                    <CardFooter onClick={this.SavePlace}>
                                        <p>Save</p>
                                    </CardFooter>

                                </Card>

                                <Card key="back" className="place-card-back"  >
                                    <CardHeader>{parsePlaceType(this.props.placeType)}</CardHeader>
                                    <CardBody className="place-back-card-body">
                                        <p> {this.props.name} was saved to current travel! </p>
                                    </CardBody>
                                    <CardFooter className="back-footer"  >
                                        <p className="back-footer-btn last">Find it in saved</p>
                                    </CardFooter>
                                </Card>

                            </ReactCardFlip>
                        </div>
                    );
                }
            }
            else {
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
                                <CardFooter onClick={this.GoBack}>
                                    <p value={this.props.id} >Hide</p>
                                </CardFooter>

                            </Card>

                            <Card key="back" className="place-card-back"  >
                                <CardHeader>The card id hidden</CardHeader>
                                <CardBody className="place-back-card-body">
                                    {this.props.name}
                                </CardBody>
                                <CardFooter className="back-footer" onClick={this.GoBack} >
                                    <p className="back-footer-btn last">Show</p>
                                </CardFooter>
                            </Card>

                        </ReactCardFlip>
                    </div>
                );
            }
        }

        
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
