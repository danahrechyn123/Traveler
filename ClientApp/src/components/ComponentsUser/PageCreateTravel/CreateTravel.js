import React from 'react';
import './CreateTravel.css';
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, Input
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
                travelType: '',
                placeType: '',
                priceType: ''
            },
            countryList: '',
            cityList: '',
            isFlipped: false,
            dropdownOpen: false,
            dropdownCityOpen: false,
            dropdownTravelTypeOpen: false,
            dropdownPlaceTypeOpen: false,
            dropdownPriceTypeOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleCity = this.toggleCity.bind(this);
        this.toggleTravelType = this.toggleTravelType.bind(this);
        this.togglePriceType = this.togglePriceType.bind(this);
        this.togglePlaceType = this.togglePlaceType.bind(this);

        this.handleChoose = this.handleChoose.bind(this);
        this.handleChooseCountry = this.handleChooseCountry.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        travelService.addTravel(this.state.travel);
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

    togglePlaceType() {
        this.setState(prevState => ({
            dropdownPlaceTypeOpen: !prevState.dropdownPlaceTypeOpen
        }));
    
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
                                    <Dropdown isOpen={this.state.dropdownPlaceTypeOpen} toggle={this.togglePlaceType}>
                                        <DropdownToggle caret className="dropdown-toogle">
                                            Place Type
                                    </DropdownToggle>
                                        <DropdownMenu>
                                            {placeTypeList && placeTypeList.map((c) => (
                                                <DropdownItem key={c}
                                                    name="placeType"
                                                    value={c}
                                                    onClick={this.handleChange}
                                                >
                                                    {c}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </InputGroupAddon>
                                <Input value={this.state.travel.placeType} disabled className="dp-input" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Dropdown isOpen={this.state.dropdownTravelTypeOpen} toggle={this.toggleTravelType}>
                                        <DropdownToggle caret className="dropdown-toogle">
                                            Travel Type
                                    </DropdownToggle>
                                        <DropdownMenu>
                                            {travelTypeList && travelTypeList.map((c) => (
                                                <DropdownItem key={c}
                                                    name="travelType"
                                                    value={c}
                                                    onClick={this.handleChange}
                                                >
                                                    {c}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </InputGroupAddon>
                                <Input value={this.state.travel.travelType} disabled className="dp-input" />
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


                        </CardBody>
                        <CardFooter onClick={this.handleSubmit} className="front-footer"> Submit </CardFooter>
                    </Card>

                    <Card key="back" className="back-card">
                        <CardHeader>Result</CardHeader>
                        <CardBody>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>

                        </CardBody>
                        <CardFooter onClick={this.handleClick} className="back-footer"> Back </CardFooter>
                    </Card>
              
                </ReactCardFlip>
            </div>
        );
    }
}

export default CreateTravel;

let travelTypeList = ["Relaxing", "Sport", "Educational", "Bussiness"];
let priceTypeList = ["Minimum", "Medium", "Expensive", "Luxury"];
let placeTypeList = ["Restaurant", "Hotel", "Museum", "Monument", "Entertaiment"];
