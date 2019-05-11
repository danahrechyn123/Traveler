import { handleError, handleResponse } from '../helpers';


export const adminService = {
    acceptPlace,
    deletePlace
};

function acceptPlace(placeId) {

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: placeId
    };

    return fetch('api/PlaceToVisits/acceptPlace', requestOptions)
        .then(handleResponse, handleError);
}
function deletePlace(placeId) {

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: placeId
    };

    return fetch('api/PlaceToVisits/deletePlace', requestOptions)
        .then(handleResponse, handleError);
}
