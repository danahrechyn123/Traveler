import { handleError, handleResponse } from '../helpers';


export const dataService = {
    getCountries,
    getCities,
    getUsers,
    getPlaceByUserId
};

function getCountries() {
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return fetch('/api/Data/countries', requestOptions)
        .then(handleResponse, handleError)
        .then(res => {
            return res;
        })
        .catch();
}

function getCities(country) {

    if (country === "") { return alert("select country"); }
    const c = {
        Name: country
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(c)
    };
    
    return fetch('/api/Data/cities', requestOptions)
        .then(handleResponse, handleError)
        .then(res => {
            return res;
        })
        .catch();
}
function getUsers() { }
function getPlaceByUserId() { }
