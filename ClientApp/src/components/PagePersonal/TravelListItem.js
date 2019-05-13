import React from 'react';
import {
    ListGroupItem, ListGroupItemText, ListGroupItemHeading, Badge, TabContent, TabPane,
    Modal, ModalHeader, ModalBody, ModalFooter, CardDeck, Nav, NavItem, NavLink
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
            activeTab: 'All'
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

    }

    toggleTabAll = () => {
        //the same as toggleOpen 
    }


    render() {

        return (
            <div>
                <ListGroupItem onClick={this.toggleOpen}>
                    <ListGroupItemHeading>{this.props.city} ({this.props.country})</ListGroupItemHeading>
                    <ListGroupItemText>
                        Price Type : {this.props.priceType} <br />
                        Owner: {this.props.owner}<br />
                        Date: {this.props.date}<br />
                        Registered People: <Badge>{this.props.registedAmount}</Badge><br />
                    </ListGroupItemText>
                </ListGroupItem>

              
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="travel-model">
                    <ModalHeader toggle={this.toggle} className="travel-model-header">{this.props.city} ({this.props.country})</ModalHeader>

                    <ModalBody className="travel-model-body">
                        <Nav tabs className="tab-nav">
                            <NavItem className="tab-nav-item">
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'All' })}
                                    onClick={this.toggleOpen}
                                >
                                    All
                                     </NavLink>
                            </NavItem>
                            <NavItem className="tab-nav-item">
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Saved' })}
                                    onClick={this.toggleTabSaved}
                                >
                                    Saved
                                     </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab} className="place-tab-div">
                            <TabPane tabId={this.state.activeTab}>
                                <CardDeck>
                                    {this.state.placeList && this.state.placeList.map((place) => (
                                        <PlaceCard
                                            id={place.id}
                                            name={place.name}
                                            placeType={place.placeType}
                                            imgUrl={place.imgUrl}
                                            about={place.about}
                                            for="travel-list-place"
                                            travelId={this.props.id}
                                            status={this.state.activeTab}
                                        />
                                    ))}
                                </CardDeck>
                            </TabPane>
                        </TabContent>
                       
                    </ModalBody>
                    <ModalFooter onClick={this.toggleClose} className="travel-model-footer">Cancel </ModalFooter>
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

