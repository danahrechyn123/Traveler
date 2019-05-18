import React from 'react';
import {
    ListGroupItem, ListGroupItemText, ListGroupItemHeading, Badge, TabContent, TabPane,
    Modal, ModalHeader, ModalBody, ModalFooter, CardDeck, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import { travelService } from '../../services/TravelService';
import { placeService } from '../../services/PlaceService';
import PlaceCard from '../PageCreateTravel/PlaceCard';


class TravelListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            placeList: '',
            activeTab: 'All',
            totalPrice:''
        };
        
    }

    toggleOpen = () => {
        this.setState({
            activeTab: 'All',
            placeList: ''
        });
       

        travelService.getPlacesIdData(this.props.id, this.props.userId).then(res => {
            this.setState({
                placeList: res,
                modal: true
            });
        }).catch(err => console.log(err));

        travelService.calculateTotalPrice(this.props.id).then(res => {
            this.setState({
                totalPrice: res
            });
        }).catch(err => console.log(err));
    }

    toggleClose = () => {
        this.setState(prevState => ({
            modal: false,
            places:''
        }));
    }

    toggleTabSaved = () => {
         
        this.setState({
            activeTab: 'Saved',
            placeList:''
        });

        placeService.getSavedPlaces(this.props.id).then(res => {
            console.log(res);
            this.setState({
                placeList: res
            });
        }).catch(err => console.log(err));
        this.toggleUpdate();

    }

    toggleUpdate = () => {
        travelService.calculateTotalPrice(this.props.id).then(res => {
            this.setState({
                totalPrice: res
            });
        }).catch(err => console.log(err));
    }


    render() {

        return (
            <div>
                <ListGroupItem onClick={this.toggleOpen}>
                    <ListGroupItemHeading className = "travel-item-header">{this.props.country} - {this.props.city} </ListGroupItemHeading>
                    <ListGroupItemText>
                        Type : {this.props.priceType} <br /> 
                        Date From : {this.props.dateFrom} <br />
                        Date Till : {this.props.dateTill} <br />

                    </ListGroupItemText>
                </ListGroupItem>

              
                <Modal isOpen={this.state.modal} className="travel-model">
                    <ModalHeader className="travel-model-header"  >
                        <Row>
                            <h2 className="row-now"> { this.state.activeTab } </h2>
                            <h2>{this.props.city}</h2>
                            <Row className="row-btns">
                        
                                <h2 onClick={this.toggleOpen}><div className="modal-header-nav-item" >Show All </div></h2>
                                <h2 onClick={this.toggleTabSaved}><div className="modal-header-nav-item"> Saved </div></h2>
                                <h2 onClick={this.toggleClose}><div className="modal-header-nav-item"> Close </div></h2>
                            </Row>
                        </Row>
                        
                     </ModalHeader>

                    <ModalBody className="travel-model-body">
                        <div className="places-content">
                        
                        
                                <CardDeck>
                                    {this.state.placeList && this.state.placeList.map((place) => (
                                        <PlaceCard
                                            id={place.id}
                                            name={place.name}
                                            cityName={place.cityName}
                                            placeType={place.placeType}
                                            priceType={place.priceType}
                                            imgUrl={place.imgUrl}
                                            about={place.about}
                                            username={place.username}
                                            price={place.price}
                                            for="travel-list-place"
                                            travelId={this.props.id}
                                            status={this.state.activeTab}
                                        />
                                    ))}
                                </CardDeck>
                        </div>
                        <div className="price-content">
                            <div className="price-content-header">
                                Price
                            </div>
                            <div className="price-content-body"> 
                                <p>Total Price: {this.state.totalPrice.totalPrice} $</p>
                                <hr />
                                <table>
                                    <tr>
                                        <td>Hotel:</td>
                                            <td>{this.state.totalPrice.hotels} $</td>
                                    </tr>
                                    <tr>
                                        <td>Restaurants:</td>
                                            <td> {this.state.totalPrice.restaurants} $</td>
                                    </tr>
                                    <tr>
                                        <td>Entertaimets:</td>
                                        <td>{this.state.totalPrice.entertaiments} $</td>
                                    </tr>
                                    <tr>
                                        <td>Museums:</td>
                                        <td>{this.state.totalPrice.museums} $</td>
                                    </tr> 
                                    <tr>
                                        <td>Monuments:</td>
                                        <td>{this.state.totalPrice.monuments} $</td>
                                    </tr>
                                </table>

                            </div> 
                            <div className="price-content-btn" onClick={this.toggleUpdate}> Update</div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default TravelListItem;

function parsePriceType(id) {
    if (id === 0) { return "Minimum"; }
    else if (id === 1) { return "Medium"; }
    else if (id === 2) { return "Expensive"; }
    else if (id === 3) { return "Luxury"; }
    else { return "error"; }
}

