import React from 'react'
import Router from 'next/router'
import axios from 'axios'

import withAuth from '@/hoc/withAuth'
import FormCountrySearch from '@/forms/CountrySearch'

function CountriesSearch(countryInfo) {
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

  return (
    <div className="container px-3">
      <div className="d-flex flex-column mt-5">
        <h3 className="text-muted fw-light mt-4 mb-5 ms-4">Search for Countries</h3>

        <div className="row mb-5 ms-3 w-50">
          <FormCountrySearch options={options} handleChange={handleChange} />
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
