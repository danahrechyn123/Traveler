import { handleError, handleResponse } from '../helpers';


export const travelService = {
    addTravel
};

function addTravel(travel) {
    var travelType = parseTravelType(travel.travelType);
    var placeType = parsePlaceType(travel.placeType);
    var priceType = parsePriceType(travel.parsePriceType);

    console.log(travelType);
}


function parseTravelType(typeName) {
    if (typeName === "Relaxing") { return 0; }
    else if (typeName === "Sport") { return 1; }
    else if (typeName === "Educational") { return 2; }
    else if (typeName === "Bussiness") { return 3; }
}
function parsePlaceType(typeName) {
    if (typeName === "Restaurant") { return 0; }
    else if (typeName === "Hotel") { return 1; }
    else if (typeName === "Museum") { return 2; }
    else if (typeName === "Monument") { return 3; }
    else if (typeName === "Entertaiment") { return 4; }
}
function parsePriceType(typeName) {
    if (typeName === "Minimum") { return 0; }
    else if (typeName === "Medium") { return 1; }
    else if (typeName === "Expensive") { return 2; }
    else if (typeName === "Luxury") { return 3; }
}

