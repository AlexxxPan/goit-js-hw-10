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

const changeBorderColor = color => (refs.searchForm.style.backgroundColor = color);

refs.searchForm.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  changeBorderColor('white');

  const countries = e.target.value.trim();
  
  if (countries === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countries)
    .then(renderCountriesInfo)
    .catch(_error => Notiflix.Notify.failure('❌Oops, there is no country with that name'));
    changeBorderColor('lightpink');
}

function renderCountriesInfo(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('⚠️Too many matches found. Please, enter a more specific name');
    changeBorderColor('gainsboro');
    refs.countryList.innerHTML = '';
  }

  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="official-name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = markup;

  if (countries.length > 1) {
    refs.countryInfo.innerHTML = '';
  }
  changeBorderColor('aquamarine');
  renderCountriesList(countries);
}

function renderCountriesList(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
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

  if (countries.length === 1) {
    refs.countryList.innerHTML = '';
  }
}

document.querySelector('#search-box').placeholder = 'Search by countries...';