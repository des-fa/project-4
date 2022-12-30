import React, { useState } from 'react'
// import Router from 'next/router'
import axios from 'axios'
import { Image } from 'react-bootstrap'
import parse from 'html-react-parser'

import Map from '@/components-layouts/maps/home-map'
import FormCountrySearch from '@/forms/CountryCitySearch'
import withAuth from '@/hoc/withAuth'
import countriesData from '../data/countries.json'

function Home(countryInfo) {
  // const [countryName, setCountryName] = useState('')
  const [countryIso, setCountryIso] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [wikiExtract, setWikiExtract] = useState('')
  const [wikiPageId, setWikiPageId] = useState('')
  const options = countryInfo?.countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))

  const handleChange = async (value) => {
    setCountryIso(value?.value.toUpperCase() || '')
    // setCountryName(value?.label || '')
    // console.log(value)

    const countryData = await countriesData.find((country) => country.iso2.toUpperCase() === value?.value?.toUpperCase())
    // console.log('countryData ', countryData)

    setLat(countryData?.latitude)
    setLong(countryData?.longitude)

    if (!value) {
      setWikiExtract('')
    }

    // api to fetch the search result
    let url = 'https://en.wikipedia.org/w/api.php'

    // const params = {
    //   action: 'opensearch',
    //   search: searchTerm,
    //   limit: '5',
    //   namespace: '0',
    //   format: 'json'
    // }

    const params = {
      action: 'query',
      // list: 'search',
      prop: 'extracts',
      exsentences: 4,
      titles: value?.label,
      // srsearch: searchTerm,
      format: 'json'
    }

    url = `${url}?origin=*`
    Object.keys(params).forEach((key) => { url += `&${key}=${params[key]}` })

    if (value?.label) {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
        // if (response.query.search[0].title === searchTerm) {
          // console.log(response)
          const respObject = response.query.pages
          const respPageId = Object.keys(respObject)[0]
          // console.log(response.query.pages[respPageId].extract)
          if (value?.label) {
            const parsedWikiExtract = parse(response.query.pages[respPageId].extract)
            setWikiExtract(parsedWikiExtract)
            setWikiPageId(respPageId)
          }
        // }
        })
        .catch((error) => { console.log(error) })
    }
  }

  // const handleSubmit = () => {
  //   const { pathname } = Router
  //   if (pathname !== `/countries/${countryIso.toUpperCase()}`) {
  //     Router.push(`/countries/${countryIso.toUpperCase()}`)
  //   }
  // }

  return (
    <div className="container px-4 pb-5">
      <div className="mt-4">
        <h3 className="text-muted fw-light">Search for countries</h3>
      </div>

      <div className="d-flex flex-lg-row flex-column my-4 gap-5">
        <div className="col-lg-3 col-md-12">
          <div className="d-flex flex-row justify-content-center w-100">
            <FormCountrySearch options={options} handleChange={handleChange} />

            {/* <button
              className="btn btn-outline-secondary ms-2"
              type="submit"
              onClick={handleSubmit}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg></button> */}
          </div>

          {wikiExtract ? (
            <div className="d-flex flex-row justify-content-end my-3">
              <a href={`/countries/${countryIso?.toUpperCase()}`} className="action-btn text-decoration-none link-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-info-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </a>
            </div>
          ) : null}

          {wikiExtract ? (
            <div className="mb-4 mt-2 mx-auto text-center" style={{ minHeight: 100 }}>
              <Image
                alt="country-flag"
                src={`https://countryflagsapi.com/svg/${countryIso}`}
                width={250}
                crossOrigin="anonymous"
              />
            </div>
          ) : null}

          <div className="mt-2">
            {wikiExtract}
            {wikiExtract ? (
              <div className="d-flex flex-row justify-content-end">
                <a
                  href={`https://en.wikipedia.org/?curid=${wikiPageId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none link-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="action-btn bi bi-eyeglasses"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                  </svg>
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col w-100">
          <Map lat={lat} long={long} />
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

export default withAuth(Home)
