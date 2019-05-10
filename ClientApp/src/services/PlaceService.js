import { parsePriceType, parsePlaceType } from './TravelService';

export const placeService = {
    suggestPlace,
    acceptPlace,
    getPlacesByCountry,
    getPlacesByCity,
    getPlacesByType,
    getPlaceByUserId
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

function acceptPlace(place) { }
function getPlacesByCountry(place) { }
function getPlacesByCity(place) { }
function getPlacesByType(place) { }
function getPlaceByUserId(place) { }