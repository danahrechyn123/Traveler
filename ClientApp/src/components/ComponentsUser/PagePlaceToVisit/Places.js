import React from 'react';
import { Link } from 'react-router-dom';
import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    CardDeck
} from 'reactstrap';
import classnames from 'classnames';
import { placeService } from '../../../services/PlaceService';
import PlaceCard from '../PageCreateTravel/PlaceCard';




class Places extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 'Entertaiment',
            currentPlaceList: ''
        };
    }

    componentWillMount() {
        placeService.getPlacesByType('Entertaiment').then(res => {

            console.log(res);
            this.setState({
                currentPlaceList: res
            });
        }).catch(err => console.log(err));
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                currentPlaceList: ''
            });
        }

        placeService.getPlacesByType(tab).then(res => {
            this.setState({
                currentPlaceList: res
            });
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="Places container-fluid">
                <div className="AddPlaceBtn">
                    <h2><Link className="btn btn-outline-primary" to={'/createplace'}>Suggest place to visit</Link></h2>
                </div>
                <div >
                    <Nav tabs className="tab-nav">
                        <NavItem className="tab-nav-item">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'Entertaiment' })}
                                onClick={() => { this.toggle('Entertaiment'); }}
                            >
                                Entertaiments
                        </NavLink>
                        </NavItem>
                        <NavItem className="tab-nav-item">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'Hotel' })}
                                onClick={() => { this.toggle('Hotel'); }}
                            >
                                Hotels
                            </NavLink>
                        </NavItem>
                        <NavItem className="tab-nav-item">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'Restaurant' })}
                                onClick={() => { this.toggle('Restaurant'); }}
                            >
                                Restaurants
                        </NavLink>
                        </NavItem>
                        <NavItem className="tab-nav-item">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'Monument' })}
                                onClick={() => { this.toggle('Monument'); }}
                            >
                                Monuments
                        </NavLink>
                        </NavItem>
                        <NavItem className="tab-nav-item">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === 'Museum' })}
                                onClick={() => { this.toggle('Museum'); }}
                            >
                                Museums
                        </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab} className="place-tab-div">
                        <TabPane tabId="Hotel">
                            <CardDeck>
                                {this.state.currentPlaceList && this.state.currentPlaceList.map((place) => (
                                    <PlaceCard
                                        id={place.id}
                                        name={place.name}
                                        placeType={place.placeType}
                                        imgUrl={place.imgUrl}
                                        about={place.about} />
                                ))}
                            </CardDeck>
                        </TabPane>
                        <TabPane tabId="Restaurant">
                            <CardDeck>
                                {this.state.currentPlaceList && this.state.currentPlaceList.map((place) => (
                                    <PlaceCard
                                        id={place.id}
                                        name={place.name}
                                        placeType={place.placeType}
                                        imgUrl={place.imgUrl}
                                        about={place.about} />
                                ))}
                            </CardDeck>
                        </TabPane>
                        <TabPane tabId="Museum">
                            <CardDeck>
                                {this.state.currentPlaceList && this.state.currentPlaceList.map((place) => (
                                    <PlaceCard
                                        id={place.id}
                                        name={place.name}
                                        placeType={place.placeType}
                                        imgUrl={place.imgUrl}
                                        about={place.about} />
                                ))}
                            </CardDeck>
                        </TabPane>
                        <TabPane tabId="Monument">
                            <CardDeck>
                                {this.state.currentPlaceList && this.state.currentPlaceList.map((place) => (
                                    <PlaceCard
                                        id={place.id}
                                        name={place.name}
                                        placeType={place.placeType}
                                        imgUrl={place.imgUrl}
                                        about={place.about} />
                                ))}
                            </CardDeck>
                        </TabPane>
                        <TabPane tabId="Entertaiment">
                            <CardDeck>
                                {this.state.currentPlaceList && this.state.currentPlaceList.map((place) => (
                                    <PlaceCard
                                        id={place.id}
                                        name={place.name}
                                        placeType={place.placeType}
                                        imgUrl={place.imgUrl}
                                        about={place.about} />
                                ))}
                            </CardDeck>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

export default Places;
