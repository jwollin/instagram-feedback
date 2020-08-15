import fetch from 'node-fetch';

export const call = (url, options) => {
    return fetch(url, options).then((response) => {
        return response.json();
    });
};