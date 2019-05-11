import { parsePriceType, parsePlaceType } from './TravelService';
import { handleError, handleResponse } from '../helpers';


export const placeService = {
    suggestPlace,
    acceptPlace,
    getPlacesByCountry,
    getPlacesByCity,
    getPlacesByType,
    getPlaceByUserId,
    getNewPlaces
};

function suggestPlace(place) {
    var priceType = parsePriceType(place.priceType);
    var placeType = parsePlaceType(place.placeType);

    var pl = {
        UserId: place.userId,
        CityName: place.city,
        PriceType: priceType,
        PlaceType: placeType,
        ImgUrl: place.imgUrl,
        About: place.about,
        Name: place.name,
        Price: place.price
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pl)
    };

    return fetch('api/PlaceToVisits/suggestPlace', requestOptions);
}


function getPlacesByType(placeName) {
    var placeType = parsePlaceType(placeName);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placeType)
    };

    return fetch('api/PlaceToVisits/getPlacesByType', requestOptions)
        .then(handleResponse, handleError)
        .then(res => {
            return res;
        })
        .catch();
}


function getNewPlaces() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch('api/PlaceToVisits/getNewPlaces', requestOptions)
        .then(handleResponse, handleError)
        .then(res => {
            return res;
        })
        .catch();
}

function acceptPlace(place) { }
function getPlacesByCountry(place) { }
function getPlacesByCity(place) { }
function getPlaceByUserId(place) { }