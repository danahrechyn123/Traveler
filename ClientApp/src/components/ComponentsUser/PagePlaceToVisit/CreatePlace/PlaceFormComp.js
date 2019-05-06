import React from 'react';
import { connect } from 'react-redux';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupText, InputGroupAddon, Input, Button, ButtonGroup
} from 'reactstrap';
import '../Places.css';
import { dataService } from '../../../../services/DataService';
import { placeService } from '../../../../services/PlaceService';

class PlaceFormComp extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            data: {
                country: '',
                city: '',
                travelType: '',
                placeType: '',
                priceType: '',
                imgUrl: '',
                name: '',
                about: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            countryList: '',
            cityList: '',
            travelTypeText: '',
            placeTypeText: '',
            priceType: '',
            dropdownOpen: false,
            dropdownCityOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleCity = this.toggleCity.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
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
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                [name]: value
            }
        });     
    }
    

    handleChoose() {
        var cities = dataService.getCities(this.state.data.country).then(res => {
            this.setState({
                cityList: res
            });
        }).catch(err => console.log(err));  
        
    }

    handleSubmit(event) {
        event.preventDefault();              
        placeService.suggestPlace(this.state.data);        
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
    togglePlaceType() {
        this.setState(prevState => ({
            dropdownTypePlaceOpen: !prevState.dropdownTypePlaceOpen
        }));
    }
    togglePriceType() {
        this.setState(prevState => ({
            dropdownTypePriceOpen: !prevState.dropdownTypePriceOpen
        }));
    }
    toggleTravelType() {
        this.setState(prevState => ({
            dropdownTypeTravelOpen: !prevState.dropdownTypeTravelOpen
        }));
    }

    render() {
        const { data, countryList } = this.state;


        return (
            <div className="loginpage page2">
                <div className="column">
                    <form className="placeForm" onSubmit={this.handleSubmit}>
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={data.name}
                                onChange={this.handleChange} />
                        </div>

                        <div>
                            <label htmlFor="imgUrl">Image URL</label>
                            <input type="text" className="form-control"
                                name="imgUrl"
                                value={data.imgUrl}
                                onChange={this.handleChange} />
                        </div>
                        <br />

                        <img src={data.imgUrl} width="400" height="290"/>
                        <br />

                        <div>
                            <label htmlFor="about">About</label>
                            <input type="text" className="form-control"
                                name="about"
                                value={data.about}
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
                            <Input value={data.country} disabled className="dp-input" />
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
                            <Input value={data.city} disabled className="dp-input" />
                        </InputGroup>

                        <ButtonGroup size = "sm">
                            <Button name="travelType" value="0" onClick={this.handleChange} >Relaxing</Button>
                            <Button name="travelType" value="1" onClick={this.handleChange} >Sport</Button>
                            <Button name="travelType" value="2" onClick={this.handleChange} >Educational</Button>
                            <Button name="travelType" value="3" onClick={this.handleChange} >Bussiness</Button>
                        </ButtonGroup>

                        <ButtonGroup size="sm">
                            <Button name="placeType" value="0" onClick={this.handleChange} >Restaurant</Button>
                            <Button name="placeType" value="1" onClick={this.handleChange} >Hotel</Button>
                            <Button name="placeType" value="2" onClick={this.handleChange} >Museum</Button>
                            <Button name="placeType" value="3" onClick={this.handleChange} >Monument</Button>
                            <Button name="placeType" value="4" onClick={this.handleChange} >Entertaiment</Button>
                        </ButtonGroup>
                        
                        <ButtonGroup size="sm">
                            <Button name="priceType" value="0" onClick={this.handleChange} >Minimal</Button>
                            <Button name="priceType" value="1" onClick={this.handleChange} >Medium</Button>
                            <Button name="priceType" value="2" onClick={this.handleChange} >Expensive</Button>
                            <Button name="priceType" value="3" onClick={this.handleChange} >Luxary</Button>
                        </ButtonGroup>
                        
                        
                        <br />
                        <br />

                        <h2><button type="submit">Submit</button></h2>
                    </form>
                </div>
            </div>
        );
    }

}

export default PlaceFormComp;