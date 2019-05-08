import React from 'react';
import './CreateTravel.css';
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, Input, Row, Col
} from 'reactstrap';

import ReactCardFlip from 'react-card-flip';
import { travelService } from '../../../services/TravelService';
import { dataService } from '../../../services/DataService';

class CreateTravel extends React.Component {

    constructor() {
        super();
        this.state = {
            travel: {
                country: '',
                city: '',
                priceType: '',
                peopleAmount: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            countryList: '',
            cityList: '',
            isFlipped: false,
            dropdownOpen: false,
            dropdownCityOpen: false,
            dropdownPriceTypeOpen: false,
            dropdownPeopleAmount:false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleCity = this.toggleCity.bind(this);
        this.togglePriceType = this.togglePriceType.bind(this);
        this.togglePeopleAmount = this.togglePeopleAmount.bind(this);


        this.handleChoose = this.handleChoose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSaveTravel = this.handleSaveTravel.bind(this);
        this.handleViewTravel = this.handleViewTravel.bind(this);
        this.handleChooseCountry = this.handleChooseCountry.bind(this);
    }

    componentWillMount() {
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
                city:''
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
                peopleAmount: ''
            }
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
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        travelService.addTravel(this.state.travel);
        this.setState({
            travel: {
                country: '',
                city: '',
                priceType: '',
                peopleAmount: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            }
        });
    }

    handleViewTravel(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        travelService.viewTravel(this.state.travel);
    }


    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleCity() {
        if (this.state.travel.country !== '') {
            this.setState(prevState => ({
                dropdownCityOpen: !prevState.dropdownCityOpen
            }));
        }
        else {
            alert("Choose country before.");
        }
    }

    togglePriceType() {
        this.setState(prevState => ({
            dropdownPriceTypeOpen: !prevState.dropdownPriceTypeOpen
        }));
    }

    toggleTravelType() {
        this.setState(prevState => ({
            dropdownTravelTypeOpen: !prevState.dropdownTravelTypeOpen
        }));
    }

    togglePeopleAmount() {
        this.setState(prevState => ({
            dropdownPeopleAmount: !prevState.dropdownPeopleAmount
        }));
    }


    render() {
        return (
            <div className="CreateTravel container-fluid">
                <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack="1.3" flipSpeedBackToFront="1.3">
                    
                    <Card  key="front" className="front-card">
                        <CardHeader>Create Travel</CardHeader>
                        <CardBody>
                            
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
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Dropdown isOpen={this.state.dropdownPeopleAmount} toggle={this.togglePeopleAmount}>
                                        <DropdownToggle caret className="dropdown-toogle">
                                            People Amount
                                    </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem name="peopleAmount" value={0} onClick={this.handleChange}>Alone</DropdownItem>
                                            <DropdownItem name="peopleAmount" value={1} onClick={this.handleChange}> +1 person </DropdownItem>
                                            <DropdownItem name="peopleAmount" value={2} onClick={this.handleChange}> +2 people </DropdownItem>
                                            <DropdownItem name="peopleAmount" value={3} onClick={this.handleChange}> +3 people </DropdownItem>
                                            <DropdownItem name="peopleAmount" value={4} onClick={this.handleChange}> +4 people </DropdownItem>
                                            <DropdownItem name="peopleAmount" value={5} onClick={this.handleChange}> +5 people </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </InputGroupAddon>
                                <Input value={this.state.travel.peopleAmount} disabled className="dp-input" />
                            </InputGroup>

                        </CardBody>
                        <CardFooter onClick={this.handleViewTravel} className="front-footer"> Submit </CardFooter>
                    </Card>

                    <Card key="back" className="back-card">
                        <CardHeader>Result</CardHeader>
                        <CardBody>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>

                        </CardBody>
                        <CardFooter className="back-footer" >                            
                                <p onClick={this.handleSaveTravel} className="back-footer-btn">Save travel</p>
                                <p onClick={this.handleClick} className="back-footer-btn last">Go Back</p>                            
                        </CardFooter>
                    </Card>
              
                </ReactCardFlip>
            </div>
        );
    }
}

export default CreateTravel;

let priceTypeList = ["Minimum", "Medium", "Expensive", "Luxury"];
