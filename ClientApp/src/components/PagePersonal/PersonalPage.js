import React from 'react';
import './PersonalPage.css';
import {
    Card, CardHeader, CardFooter, CardBody, ListGroup,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, Input, Table
} from 'reactstrap';
import TravelListItem from './TravelListItem';
import { travelService } from '../../services/TravelService';
import { dataService } from '../../services/DataService';


class PersonalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: JSON.parse(localStorage.getItem('user')).id,
            travelList: '',
            activeTab: '1',
            travel: {
                country: '',
                city: '',
                priceType: '',
                dateFrom: '',
                dateTill: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            countryList: '',
            cityList: '',
            placeList: '',
            isFlipped: false,
            dropdownOpen: false,
            dropdownCityOpen: false,
            dropdownPriceTypeOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveTravel = this.handleSaveTravel.bind(this);
        this.handleChooseCountry = this.handleChooseCountry.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        travelService.getTravelForUser(this.state.userId).then(res => {
            this.setState({
                travelList: res
            });
        }).catch(err => console.log(err));

        dataService.getCountries().then(res => {
            this.setState({
                countryList: res
            });
        }).catch(err => console.log(err));

        dataService.getCities("Ukraine").then(res => {
            this.setState({
                cityList: res
            });
        }).catch(err => console.log(err));
    }

  

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleCity = () => {
        if (this.state.travel.country !== '') {
            this.setState(prevState => ({
                dropdownCityOpen: !prevState.dropdownCityOpen
            }));
        }
        else {
            alert("Choose country before.");
        }
    }

    toggleOpenForm = () => {
        document.getElementById("mySidenav").style.width = "100%";
    }

    toggleCloseForm = () => {
        travelService.getTravelForUser(this.state.userId).then(res => {
            this.setState({
                travelList: res
            });
        }).catch(err => console.log(err));
        document.getElementById("mySidenav").style.width = "0";
    }

    togglePriceType = () => {
        this.setState(prevState => ({
            dropdownPriceTypeOpen: !prevState.dropdownPriceTypeOpen
        }));
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { travel } = this.state;
        this.setState({
            travel: {
                ...travel,
                [name]: value
            }
        });
    }

    handleChooseCountry(event) {
        const { value } = event.target;
        const { travel } = this.state;
        this.setState({
            travel: {
                ...travel,
                country: value,
                city: ''
            }
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            travel: {
                country: '',
                city: '',
                travelType: '',
                placeType: '',
                priceType: '',
                peopleAmount: '',
                dateFrom: '',
                dateTill: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            placeList: ''

        });
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    handleChoose() {
        if (this.state.travel.country !== '') {
            var cities = dataService.getCities(this.state.travel.country).then(res => {
                this.setState({
                    cityList: res
                });
            }).catch(err => console.log(err));
        }
    }

    handleSaveTravel(event) {

        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        travelService.addTravel(this.state.travel);
        this.setState({
            travel: {
                country: '',
                city: '',
                priceType: '',
                peopleAmount: '',
                dateFrom: '',
                dateTill: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            placeList: ''
        });
        
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
                                    dateFrom={tr.dateFrom}
                                    dateTill={tr.dateTill}
                                    priceType={parsePriceType(tr.priceType)}
                                    daysAmount={tr.daysAmount}
                                />
                            ))}

                        </ListGroup>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>

                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.toggleCloseForm}>&times;</a>

                    <div className="form-div">
                        <h2>Create your new travel!</h2>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret className="dropdown-toogle">
                                        Country
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.countryList && this.state.countryList.map((c) => (
                                            <DropdownItem key={c.id}
                                                name="country"
                                                value={c.name}
                                                onClick={this.handleChooseCountry}
                                            >
                                                {c.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                            <Input value={this.state.travel.country} disabled className="dp-input" />
                        </InputGroup>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <Dropdown isOpen={this.state.dropdownCityOpen} toggle={this.toggleCity} onClick={this.handleChoose} >
                                    <DropdownToggle caret className="dropdown-toogle">
                                        City
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.state.cityList && this.state.cityList.map((c) => (
                                            <DropdownItem key={c}
                                                name="city"
                                                value={c}
                                                onClick={this.handleChange}
                                            >
                                                {c}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                            <Input value={this.state.travel.city} disabled className="dp-input" />
                        </InputGroup>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <Dropdown isOpen={this.state.dropdownPriceTypeOpen} toggle={this.togglePriceType}>
                                    <DropdownToggle caret className="dropdown-toogle">
                                        Price Type
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {priceTypeList && priceTypeList.map((c) => (
                                            <DropdownItem key={c}
                                                name="priceType"
                                                value={c}
                                                onClick={this.handleChange}
                                            >
                                                {c}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                            <Input value={this.state.travel.priceType} disabled className="dp-input" />
                        </InputGroup><br/>

                        <Table>
                            <tr>
                                <th><h2>From: </h2></th>
                                <th> <input type="date" name="dateFrom" required value={this.state.travel.dateFrom}
                                    onChange={this.handleChange} />  
                                </th>
                            </tr>
                            <tr>
                                <th><h2>Till: </h2></th>
                                <th> <input type="date" name="dateTill" required
                                    min={this.state.travel.dateFrom}
                                    value={this.state.travel.dateTill}
                                    onChange={this.handleChange} />

                                </th>
                            </tr>

                        </Table>
                         

                          

                        <div onClick={this.handleSaveTravel} className="submit-btn" >Submit</div>


                    </div>
                </div>


            </div>
        );
    }
}

export default PersonalPage;

let priceTypeList = ["Minimum", "Medium", "Expensive"];
function parsePriceType(id) {
    if (id === 0) { return "Econom"; }
    else if (id === 1) { return "Medium"; }
    else if (id === 2) { return "Expensive"; }
    else { return "error" }
}