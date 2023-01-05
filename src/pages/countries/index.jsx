import React, { useState } from 'react'
import Router from 'next/router'
// import Link from 'next/link'
import axios from 'axios'

import withAuth from '@/hoc/withAuth'
import FormCountrySearch from '@/forms/CountryCitySearch'

function CountriesSearch(countryInfo) {
  const [countriesByContinent, setCountriesByContinent] = useState(null)
  // console.log(countryInfo.countryInfo)
  const options = countryInfo?.countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))

  const handleChange = (value) => {
    const { pathname } = Router
    const iso2 = value?.value.toUpperCase()
    // console.log(pathname)
    // console.log(value)
    if (pathname !== `/countries/${value}`) {
      Router.push(`/countries/${iso2}`)
    }
  }

  const handleClick = async (e) => {
    await axios({
      method: 'GET',
      url: `https://restcountries.com/v2/region/${e.target.value}`
    }).then((resp) => setCountriesByContinent(resp.data))
  }

  // console.log(countriesByContinent)

  return (
    <div className="container px-3">
      <div className="d-flex flex-column mt-5">
        <h3 className="text-white fw-light mt-4 mb-5 ms-4">Search for countries</h3>

        <div className="d-flex flex-lg-row flex-column gap-5 mb-5 ms-4 w-100">
          <div className="p-2 me-5 w-100 border rounded">
            <FormCountrySearch options={options} handleChange={handleChange} />
          </div>

          <div className="d-flex flex-lg-row flex-column gap-4 w-75">
            <button
              type="button"
              className="btn btn-outline-light px-4"
              value="Africa"
              onClick={handleClick}
            >Africa</button>

            <button
              type="button"
              className="btn btn-outline-light px-4"
              value="Americas"
              onClick={handleClick}
            >Americas</button>

            <button
              type="button"
              className="btn btn-outline-light px-4"
              value="Asia"
              onClick={handleClick}
            >Asia</button>

            <button
              type="button"
              className="btn btn-outline-light px-4"
              value="Europe"
              onClick={handleClick}
            >Europe</button>

            <button
              type="button"
              className="btn btn-outline-light px-4"
              value="Oceania"
              onClick={handleClick}
            >Oceania</button>
          </div>
        </div>

        <div className="mb-5">
          {countriesByContinent?.length > 0 ? (
            countriesByContinent?.map((country, i) => (
              <div key={i} className="continent-search-result border-top border-dark p-3 ms-4 w-50">
                <a
                  href={`/countries/${country?.alpha2Code}`}
                  className="text-decoration-none link-light"
                >
                  <h6 className="continent-search-result-text mb-0">{country?.name}</h6>
                </a>
              </div>
            ))
          ) : (null)}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('https://api.countrystatecity.in/v1/countries/', {
      headers: {
        'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
      }
    })
    return {
      props: {
        countryInfo: res.data
      }
    }
  } catch (e) {
    return {
      props: {
        countryInfo: null
      }
    }
  }
}

export default withAuth(CountriesSearch)
