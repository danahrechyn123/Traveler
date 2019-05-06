export const placeService = {
    suggestPlace,
    acceptPlace,
    getPlacesByCountry,
    getPlacesByCity,
    getPlacesByType,
    getPlaceByUserId
};

function suggestPlace(place) {

    const pl = {
        Name: place.name,
        CityId: place.city,
        TravelType: place.travelType,
        PlaceType: place.placeType,
        PriceType: place.priceType,
        ImgUrl: place.imgUrl,
        About: place.about,
        UserId: place.userId
    };

    const requestOptions = {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(pl)
    };

    return fetch('api/PlaceToVisits/', requestOptions);
}

function acceptPlace(place) { }
function getPlacesByCountry(place) { }
function getPlacesByCity(place) { }
function getPlacesByType(place) { }
function getPlaceByUserId(place) { }