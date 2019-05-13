import React from 'react';
import './PersonalPage.css';
import {
    Card, CardHeader, CardFooter, CardBody, ListGroup,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';
import TravelListItem from './TravelListItem';
import { travelService } from '../../services/TravelService';


class PersonalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: JSON.parse(localStorage.getItem('user')).id,
            travelList: '',
            activeTab: '1'
        };


        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        travelService.getTravelForUser(this.state.userId).then(res => {
            this.setState({
                travelList: res
            });
        }).catch(err => console.log(err));       
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        const currentUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="PersonalPage container-fluid">
                <Card className="personal-card" >
                    <CardHeader className="personal-card-header">
                        <h3>{currentUser.firstName} {currentUser.lastName}</h3>
                        <p>{currentUser.username}</p>
                    </CardHeader>
                    <CardBody className="personal-card-body">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Your Travels
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    You follow this travels
                             </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <ListGroup>
                                    {this.state.travelList && this.state.travelList.map((tr) => (
                                        <TravelListItem
                                            id={tr.id}
                                            city={tr.cityName}
                                            cityId={tr.cityId}
                                            country={tr.countryName}
                                            owner={tr.ownerName}
                                            date={tr.date}
                                            priceType={tr.priceType}
                                            registedAmount={tr.registedAmount}
                                            userId={currentUser.id}
                                        />
                                    ))}

                                </ListGroup>
                            </TabPane>
                            <TabPane tabId="2">
                                <ListGroup>
                                    
                                </ListGroup>
                            </TabPane>
                        </TabContent>

                    </CardBody>
                    <CardFooter> Edit Personal Data</CardFooter>
                </Card>
            </div>
        );
    }
}

export default PersonalPage;
