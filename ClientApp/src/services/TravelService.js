﻿import { handleError, handleResponse } from '../helpers';



export const travelService = {
    addTravel,
    viewTravel
};

function addTravel(travel) {
    var travelType = parseTravelType(travel.travelType);
    var priceType = parsePriceType(travel.priceType);

    const tr = {
        UserId: travel.userId,
        CityName: travel.city,
        TravelType: travelType,
        PriceType: priceType,
        PeopleAmount: travel.peopleAmount
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tr)
    };

    return fetch('api/Travel/addtravel', requestOptions);
    
}

function viewTravel(travel) {
    var travelType = parseTravelType(travel.travelType);
    var priceType = parsePriceType(travel.priceType);

    const tr = {
        UserId: travel.userId,
        CityName: travel.city,
        TravelType: travelType,
        PriceType: priceType,
        PeopleAmount: travel.peopleAmount
    };

    localStorage.setItem('travel', JSON.stringify(tr));
}

export function parseTravelType(typeName) {
    if (typeName === "Relaxing") { return 0; }
    else if (typeName === "Sport") { return 1; }
    else if (typeName === "Educational") { return 2; }
    else if (typeName === "Bussiness") { return 3; }
}
export function parsePlaceType(typeName) {
    if (typeName === "Restaurant") { return 0; }
    else if (typeName === "Hotel") { return 1; }
    else if (typeName === "Museum") { return 2; }
    else if (typeName === "Monument") { return 3; }
    else if (typeName === "Entertaiment") { return 4; }
}
export function parsePriceType(typeName) {
    if (typeName === "Minimum") { return 0; }
    else if (typeName === "Medium") { return 1; }
    else if (typeName === "Expensive") { return 2; }
    else if (typeName === "Luxury") { return 3; }
}

