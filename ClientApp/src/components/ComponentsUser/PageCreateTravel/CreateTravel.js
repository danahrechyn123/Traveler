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
            dropdownCityOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleCity = this.toggleCity.bind(this);
        this.handleChoose = this.handleChoose.bind(this);

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

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    handleChoose() {
        var cities = dataService.getCities(this.state.travel.country).then(res => {
            this.setState({
                cityList: res
            });
        }).catch(err => console.log(err));

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
        this.setState(prevState => ({
            dropdownCityOpen: !prevState.dropdownCityOpen
        }));
    }

    render() {
        return (
            <div className="CreateTravel container-fluid">
                <ReactCardFlip isFlipped={this.state.isFlipped} flipSpeedFrontToBack="1.3" flipSpeedBackToFront="1.3">
                    
                    <Card  key="front" className="front-card">
                        <CardHeader>Create Travel</CardHeader>
                        <CardBody>

                            <div>
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control"
                                    name="country"
                                    value={this.state.travel.country}
                                    onChange={this.handleChange} />
                            </div>

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
                                                    onClick={this.handleChange}
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
                                    <Dropdown isOpen={this.state.dropdownCityOpen} toggle={this.toggleCity} onClick={this.handleChoose}>
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
