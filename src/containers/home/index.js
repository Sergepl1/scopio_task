import React, { useState, useEffect }  from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import {
  getCountries
} from '../../modules/country'

const Home = props => {
  useEffect(() => {
    props.getCountries()
  }, []);
  console.log('props.countries1', props.countries)
  return (
    <div>
      <h1>Countries</h1>
      {props.countries.map(country=>(
        <Link to={`/country/${country.Slug}`}><div>{country.ISO2}</div><div>{country.Country}</div></Link>
      ))}
    </div>
  )
}

const mapStateToProps = ({ country }) => ({
  countries: country.countries
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountries,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
