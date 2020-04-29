export const SET_COUNTRIES = 'SET_COUNTRIES'
export const SET_COUNTRY = 'SET_COUNTRY'
export const SET_COUNTRY_STATS = 'SET_COUNTRY_STATS'

const initialState = {
  country: {},
  countryStats: [],
  countries: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.value,
      }

    case SET_COUNTRY:
      return {
        ...state,
        country: action.value,
      }

    case SET_COUNTRY_STATS:
      return {
        ...state,
        countryStats: action.value,
      }

    default:
      return state
  }
}


export async function fetchCountries() {
  return fetch('http://localhost:3001/countries');
}

export async function fetchCountry(slug) {
  return fetch(`https://api.covid19api.com/live/country/${slug}/status/confirmed`);
}

export async function fetchCountryByPeriod(slug, {currentDate, pastDate}) {
  return fetch(`https://api.covid19api.com/country/${slug}/status/confirmed?from=${pastDate}&to=${currentDate}`);
  return fetch(`https://api.covid19api.com/country/${slug}/status/confirmed?from=${pastDate}&to=${currentDate}`);

}

export function setCountries(countries) {
  return dispatch => {
    dispatch({
      type: SET_COUNTRIES,
      value: countries
    })
  }
}

export function getCountries() {
  return function (dispatch) {
    return fetchCountries().then(
      async countries => {
        const result = await countries.json()
        console.log('result1', result)
        dispatch(setCountries(result || []))
      },
      error => dispatch(setCountries([]))
    );
  };
}

export function setCountry(country) {
  return dispatch => {
    dispatch({
      type: SET_COUNTRY,
      value: country
    })
  }
}

export function setCountryStats(country) {
  return dispatch => {
    dispatch({
      type: SET_COUNTRY_STATS,
      value: country
    })
  }
}

export function getCountry(slug) {
  return function (dispatch) {
    return fetchCountry(slug).then(
      async country => {
        const result = await country.json()
        console.log('country1', country)
        dispatch(setCountry(result[result.length - 1] || {}))
      },
      error => dispatch(setCountry({}))
    );
  };
}

export function getCountryByPeriod(slug) {
  const currentDate = new Date().toJSON().slice(0, 10)
  const date = new Date()
  const ONE_WEEK_INTERVAL = 7
  date.setDate(date.getDate() - ONE_WEEK_INTERVAL)
  const pastDate = new Date(`${+date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).toJSON().slice(0, 10)
  return function (dispatch) {
    return fetchCountryByPeriod(slug, {currentDate:`${currentDate}T00:00:00Z`, pastDate: `${pastDate}T00:00:00Z`}).then(
      async country => {
        const result = await country.json()
        dispatch(setCountryStats(result || []))
      },
      error => dispatch(setCountry({}))
    );
  };
}
