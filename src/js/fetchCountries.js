// https://restcountries.com/v3.1/name/{name}
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

const BASE_URL = 'https://restcountries.com/v3.1/';
const SEARCH_BY_NAME = `name/`;
const PARAMS = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}${SEARCH_BY_NAME}${name}${PARAMS}`).then(response => {
        if (response.status === 404) {
            throw new Error(response.status);
        }
        return response.json();
    });
};