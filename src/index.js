import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener(
  'input',
  debounce(onInputChange, DEBOUNCE_DELAY)
);

function onInputChange(e) {
  e.preventDefault();
  searchCountry = e.target.value.trim();

  if (searchCountry === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchCountry)
    .then(searchCountry => {
      if (searchCountry.length > 10) {
        Notiflix.Notify.info(
          '⚠️Too many matches found. Please, enter a more specific name.'
        );
        return;
      }
      searchCountriesInfo(searchCountry);
    })
    .catch(_error => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      Notiflix.Notify.failure('❌Oops, there is no country with that name');
    });
}

function searchCountriesInfo(searchCountry) {
  const markup = searchCountry

    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="official-name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
    })
    .join('');

  refs.countryInfo.innerHTML = markup;

  if (searchCountry.length > 1) {
    refs.countryInfo.innerHTML = '';
  }

  renderCountriesList(searchCountry);
}

function renderCountriesList(searchCountry) {
  if (searchCountry.length >= 2 && searchCountry.length <= 10) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li>
            <img src="${flags.svg}" alt="${name.official}" width="30px">
            <p class="official-name"><b>${name.official}</b>
          </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  }

  if (searchCountry.length === 1) {
    refs.countryList.innerHTML = '';
  }
}
document.querySelector('#search-box').placeholder = 'Search by countries...';
