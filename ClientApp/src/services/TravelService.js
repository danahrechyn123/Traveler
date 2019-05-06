import { handleError, handleResponse } from '../helpers';


export const travelService = {
    addTravel
};

function addTravel(travel) {
    var travelType = parseTravelType(travel.travelType);
    console.log(travelType);
}


function parseTravelType(typeName) {
    if (typeName === "Relaxing") { return 0; }
    else if (typeName === "Sport") { return 1; }
    else if (typeName === "Educational") { return 2; }
    else if (typeName === "Bussiness") { return 3; }
}
