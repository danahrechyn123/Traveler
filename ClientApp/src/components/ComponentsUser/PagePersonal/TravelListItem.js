import React from 'react';
import {
    ListGroupItem, ListGroupItemText, ListGroupItemHeading, Badge,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { travelService } from '../../../services/TravelService';
import PlaceCard from '../PageCreateTravel/PlaceCard';


class TravelListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            placeList:''
        };
        
    }

    toggleOpen = () =>  {
        const travelData = {
            city: this.props.cityId,
            priceType: this.props.priceType
        };

        travelService.getPlacesIdData(travelData).then(res => {
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

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.city} ({this.props.country})</ModalHeader>

                    <ModalBody>
                        {this.state.placeList && this.state.placeList.map((place) => (
                            <PlaceCard
                                id={place.id}
                                name={place.name}
                                placeType={place.placeType}
                                imgUrl={place.imgUrl}
                                about={place.about} />
                        ))}
                    </ModalBody>
                    <ModalFooter onClick={this.toggleClose}>Cancel </ModalFooter>
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

