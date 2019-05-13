import { parsePriceType, parsePlaceType } from './TravelService';
import { handleError, handleResponse } from '../helpers';


export const placeService = {
    suggestPlace,
    getPlacesByType,
    getNewPlaces,
    addPlaceToTravel,
    getSavedPlaces,
    deletePlaceFromTravel
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

function addPlaceToTravel(placeId, travelId) {

    const data = {
        Placeid: placeId,
        TravelId: travelId
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch('api/SavedPlace/', requestOptions)
        .then(handleResponse, handleError)
        .catch();
}

function getSavedPlaces(travelId) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(travelId)
    };

    return fetch('api/SavedPlace/getSaved', requestOptions)
        .then(handleResponse, handleError)
        .then(res => {
            return res;
        })
        .catch();
}

function deletePlaceFromTravel(placeId, travelId) {

    const data = {
        Placeid: placeId,
        TravelId: travelId
    };

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch('api/SavedPlace/', requestOptions)
        .then(handleResponse, handleError)
        .catch();
}
