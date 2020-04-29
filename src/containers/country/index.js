import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { getCountry, getCountryByPeriod } from '../../modules/country'
import connect from 'react-redux/es/connect/connect'
import Chart from '../chart/index'

const Country = ({match, getCountry, country, getCountryByPeriod, countryStats}) => {
  useEffect(() => {
    getCountry(match.params.slug)
  }, []);
  useEffect(() => {
    getCountryByPeriod(match.params.slug)
  }, []);
  return (
    <div>
      <h1>{country.Country}</h1>
      <p>Date: {new Date(country.Date).toUTCString()}</p>
      <p>Confirmed: {country.Confirmed}</p>
      <p>Deaths: {country.Deaths}</p>
      <p>Recovered: {country.Recovered}</p>
      <Chart data={countryStats}/>
    </div>
  )
}

const mapStateToProps = ({ country }) => ({
  country: country.country,
  countryStats: country.countryStats
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountry,
      getCountryByPeriod,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Country)
