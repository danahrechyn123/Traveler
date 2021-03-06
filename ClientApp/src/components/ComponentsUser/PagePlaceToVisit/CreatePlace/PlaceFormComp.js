﻿import React from 'react';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupText, InputGroupAddon, Input, Button, ButtonGroup
} from 'reactstrap';
import '../Places.css';
import { dataService } from '../../../../services/DataService';
import { placeService } from '../../../../services/PlaceService';

class PlaceFormComp extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {
                country: '',
                city: '',
                placeType: '',
                priceType: '',
                imgUrl: '',
                name: '',
                about: '',
                price:'',
                userId: JSON.parse(localStorage.getItem('user')).id
            },
            countryList: '',
            cityList: '',
            isFlipped: false,
            dropdownOpen: false,
            dropdownCityOpen: false,
            dropdownPriceTypeOpen: false,
            dropdownPlaceTypeOpen: false
           
        };

        this.toggle = this.toggle.bind(this);
        this.toggleCity = this.toggleCity.bind(this);
        this.togglePriceType = this.togglePriceType.bind(this);
        this.togglePlaceType = this.togglePlaceType.bind(this);

        this.handleChoose = this.handleChoose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChooseCountry = this.handleChooseCountry.bind(this);
    }

    componentWillMount() {
        dataService.getCountries().then(res => {
            this.setState({
                countryList: res
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

    handleChooseCountry(event) {
        const { value } = event.target;
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                country: value,
                city: ''
            }
        });
    }

   

    handleChoose() {
        if (this.state.data.country !== '') {
            var cities = dataService.getCities(this.state.data.country).then(res => {
                this.setState({
                    cityList: res
                });
            }).catch(err => console.log(err));
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        placeService.suggestPlace(this.state.data);
        this.setState({
            data: {
                country: '',
                city: '',
                placeType: '',
                priceType: '',
                imgUrl: '',
                name: '',
                about: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            }
        });
        alert("Thank you for this amazing place!");
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleCity() {
        if (this.state.data.country !== '') {
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

  
    togglePlaceType() {
        this.setState(prevState => ({
            dropdownPlaceTypeOpen: !prevState.dropdownPlaceTypeOpen
        }));
    }


    render() {
        return (
            <div className="loginpage page2">
                <div className="column">
                    <form className="placeForm" onSubmit={this.handleSubmit}>

                        <Input placeholder="Name"
                            value={this.state.data.name}
                            name="name"
                            onChange={this.handleChange}
                        />
                        <br />

                        <Input placeholder="About"
                            value={this.state.data.about}
                            name="about"
                            onChange={this.handleChange}
                        />
                        <br />

                        <Input placeholder="Image URL"
                            value={this.state.data.imgUrl}
                            name="imgUrl"
                            onChange={this.handleChange}
                        />
                        <br />
                        <img src={this.state.data.imgUrl}
                            width="400" height="320" />

                        <br />
                        <br />
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
                            <Input value={this.state.data.country} disabled className="dp-input" />
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
                            <Input value={this.state.data.city} disabled className="dp-input" />
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
                            <Input value={this.state.data.priceType} disabled className="dp-input" />
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
                            <Input value={this.state.data.placeType} disabled className="dp-input" />
                        </InputGroup>


                        <br />
                        <div className="slidecontainer">
                            <Input placeholder="Approximate Price"
                                value={this.state.data.price}
                                disabled
                            />
                            <input
                                type="range"
                                min={GetMinPrice(this.state.data.priceType, this.state.data.placeType)}
                                max={GetMaxPrice(this.state.data.priceType, this.state.data.placeType)}
                                value={this.state.data.price}
                                name="price"
                                className="slider"
                                onChange={this.handleChange}
                                id="myRange" />
                            <p>Approximate Price: <span > {this.state.data.price}</span></p>
                        </div>
                        <br />
                        <Input type="submit" value="Suggest Place"/>

                    </form>
                </div>
            </div>
        );
    }
}

export default PlaceFormComp;


let travelTypeList = ["Relaxing", "Sport", "Educational", "Bussiness"];
let priceTypeList = ["Minimum", "Medium", "Expensive", "Luxury"];
let placeTypeList = ["Restaurant", "Hotel", "Museum", "Monument", "Entertaiment"];

function GetMinPrice(priceType, placeType) {
    if (priceType === "Minimum") {
        if (placeType === "Restaurant") { return 1; }
        if (placeType === "Hotel") { return 10; }
        if (placeType === "Museum") { return 0; }
        if (placeType === "Monument") { return 0; }
        if (placeType === "Entertaiment") { return 0; }
    }
    if (priceType === "Medium") {
        if (placeType === "Restaurant") { return 10; }
        if (placeType === "Hotel") { return 30; }
        if (placeType === "Museum") { return 15; }
        if (placeType === "Monument") { return 15; }
        if (placeType === "Entertaiment") { return 15; }
    }
    if (priceType === "Expensive") {
        if (placeType === "Restaurant") { return 25; }
        if (placeType === "Hotel") { return 100; }
        if (placeType === "Museum") { return 30; }
        if (placeType === "Monument") { return 15; }
        if (placeType === "Entertaiment") { return 30; }
    }
    if (priceType === "Luxury") {
        if (placeType === "Restaurant") { return 50; }
        if (placeType === "Hotel") { return 200; }
        if (placeType === "Museum") { return 100; }
        if (placeType === "Monument") { return 20; }
        if (placeType === "Entertaiment") { return 100; }
    }
}

function GetMaxPrice(priceType, placeType) {
    if (priceType === "Minimum") {
        if (placeType === "Restaurant") { return 10; }
        if (placeType === "Hotel") { return 30; }
        if (placeType === "Museum") { return 15; }
        if (placeType === "Monument") { return 10; }
        if (placeType === "Entertaiment") { return 15; }
    }
    if (priceType === "Medium") {
        if (placeType === "Restaurant") { return 25; }
        if (placeType === "Hotel") { return 100; }
        if (placeType === "Museum") { return 30; }
        if (placeType === "Monument") { return 15; }
        if (placeType === "Entertaiment") { return 30; }
    }
    if (priceType === "Expensive") {
        if (placeType === "Restaurant") { return 50; }
        if (placeType === "Hotel") { return 200; }
        if (placeType === "Museum") { return 100; }
        if (placeType === "Monument") { return 20; }
        if (placeType === "Entertaiment") { return 100; }
    }
    if (priceType === "Luxury") {
        if (placeType === "Restaurant") { return 1000; }
        if (placeType === "Hotel") { return 10000; }
        if (placeType === "Museum") { return 500; }
        if (placeType === "Monument") { return 25; }
        if (placeType === "Entertaiment") { return 1000; }
    }
}