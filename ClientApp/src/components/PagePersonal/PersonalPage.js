﻿import React from 'react';
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

    toggleOpenForm = () => {
        document.getElementById("mySidenav").style.width = "100%";
    }

    toggleCloseForm = () => {
        document.getElementById("mySidenav").style.width = "0";
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
                        <div className="btn-container">
                            <a className="button-p circle" onClick={this.toggleOpenForm}> + </a>
                        </div>


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
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>

                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.toggleCloseForm}>&times;</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>


            </div>
        );
    }
}

export default PersonalPage;
