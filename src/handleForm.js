import { getCurrentInfo, getForecastInfo } from './getData';

const API_KEY = 'dc93279af19f4c45a1d143219232909';
const BASE_URL = 'https://api.weatherapi.com/v1';
const form = document.querySelector('.search-form');

function handleForm() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    if (location === '') {
      alert('Please enter a location.');
    } else {
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3`;
      getCurrentInfo(url, location);
      getForecastInfo(url, location);
    }
  });
}

export default handleForm;
