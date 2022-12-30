import withAuth from '@/hoc/withAuth'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import { Accordion, Image, Tab, Tabs } from 'react-bootstrap'

import Map from '@/components-layouts/maps/city-map'
import CountryTabs from '@/components-layouts/tabs/CountryTabs'
// import { City } from 'country-state-city'
import useMySavedCountries from '@/hooks/my/saved-countries'
import FormsProfileVisitedChangeModal from '@/forms/profile/VisitedChange'
import countriesData from '../../data/countries.json'

function CountryPage({ id, countryInfo, countryNews, countryCSCInfo, citiesInfo, travelAdvisory }) {
  const [createVisitedModalShow, setCreateVisitedModalShow] = useState(false)
  console.log(countryCSCInfo)
  const [capitalInfo, setCapitalInfo] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(null)

  const saveIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
      <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
    </svg>
  )

  const savedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
    </svg>
  )

  const [saveText, setSaveText] = useState('Save')
  const [saveImg, setSaveImg] = useState(saveIcon)
  const { mySavedCountries, createMySavedCountries, destroyMySavedCountries } = useMySavedCountries()
  // console.log(mySavedCountries)
  const savedCurrentCountry = mySavedCountries?.savedCountries?.filter((country) => country.iso2 === id)

  // const cities = City.getCitiesOfCountry(id.toUpperCase())
  const options = citiesInfo?.map((city) => (
    { value: city.name, label: city.name }
  ))

  const capitalNames = Object.values(countryInfo?.capital)
  // console.log(Object.values(countryInfo?.capital))
  // console.log('options', options)

  useEffect(async () => {
    const capitalInfoArray = await Promise.all(capitalNames?.map(async (name) => {
      const response = await axios.get(`https://nominatim.openstreetmap.org/?city=${name}&countrycode=${id.toLowerCase()}&format=json`)
      const result = response.data[0] ? (response.data[0]) : (null)
      return result
    }))

    if (!capitalInfoArray[0]) {
      // console.log('array', capitalInfoArray)
      setCapitalInfo([])
    } else {
      setCapitalInfo(capitalInfoArray)
    }
  }, [countryInfo])

  // changing save button dynamically
  useEffect(() => {
    if (savedCurrentCountry?.length !== 0) {
      setSaveText('Saved')
      setSaveImg(savedIcon)
    } else {
      setSaveText('Save')
      setSaveImg(saveIcon)
    }
  }, [mySavedCountries])

  const handleSaveCountry = savedCurrentCountry?.length !== 0 ? (
    async () => {
      await destroyMySavedCountries(id)
      // .then(() => {
      //   console.log('deleted')
      // })
    }
  ) : (
    async () => {
      await createMySavedCountries({ iso2: id, countryName: countryCSCInfo?.name })
      // .then(() => {
      //   console.log('saved')
      // })
    }
  )

  // const capitalResult = capitalNames?.map((name) => (
  // citiesInfo.find((city) => city?.name?.toLowerCase() === name.toLowerCase())
  // ))

  const capitalCoordinates = capitalInfo ? (
    capitalInfo.map((info) => (
      { lat: info?.lat, long: info?.lon, name: info?.display_name }
    ))
  ) : (null)

  const currencies = Object.keys(countryInfo?.currencies).map((k, i) => (
    // Object.entries(data?.currencies[key]).map(([k, v], i) => (
    // <li key={i}>
    //   <small>{v}</small>
    // </li>
    <li key={i}>
      <small>{countryInfo?.currencies[k].name}, {countryInfo?.currencies[k].symbol}</small>
    </li>
    // ))
  ))

  const languages = Object.values(countryInfo?.languages).map(
    (value, i) => <li key={i}><small>{value}</small></li>
  )

  const timezones = countryInfo?.timezones.map(
    (timezone, i) => <li key={i}><small>{timezone}</small></li>
  )

  const countryResult = countriesData.find((country) => country.iso2.toLowerCase() === id.toLowerCase())

  const d = new Date()
  const today = moment(d).format('YYYY-MM-DD')
  const yearAgo = moment(d).subtract(365, 'days').format('YYYY-MM-DD')

  const countryWeatherInfo = async (lat, long) => {
    const resp = await axios({
      method: 'GET',
      url: `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${long}&start_date=${yearAgo}&end_date=${today}&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum&timezone=auto`
    })
    return resp.data
  }

  useEffect(async () => {
    if (countryResult) {
      const resp = await countryWeatherInfo(countryResult?.latitude, countryResult?.longitude)
      setWeatherInfo(resp)
      // console.log(weatherInfo)
    }
  }, [countryResult])

  // const currencyKey = Object.keys(data?.currencies)
  // console.log(data?.currencies[currencyKey].name)
  // console.log(data?.currencies[currencyKey].symbol)
  // console.log('entries', Object.entries(data?.currencies[currencyKey]))

  // useEffect(async () => {
  //   try {
  //     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${id}&category=general&apiKey=93393b53981d48379d78d297e6d27d82`)
  //     const data = await res.json()
  //     console.log(data)
  //     console.log('news', data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  return (
    <>
      <div className="d-flex flex-row justify-content-end mx-5 px-5 py-2 gap-3">
        <a
          href={countryInfo?.maps?.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none link-dark"
        >
          <button
            type="button"
            className="btn btn-sm btn-light text-black p-2"
          >
            <Image
              src="/images/google-maps.png"
              alt="google-maps-icon"
              width="25"
            />
          </button>
        </a>

        <button
          type="button"
          className="d-flex flex-row gap-2 align-items-center btn btn-sm btn-light text-black p-2"
          onClick={handleSaveCountry}
        >
          {saveText}
          {saveImg}
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light text-black p-2"
          onClick={() => setCreateVisitedModalShow(true)}
        >
          <span>Add</span>
          <Image
            src="/images/location.png"
            alt="location-icon"
            width="25"
            className="ms-2"
          />
        </button>

        <FormsProfileVisitedChangeModal countryInfo={countryCSCInfo} show={createVisitedModalShow} onHide={() => setCreateVisitedModalShow(false)} />
      </div>

      <div className="d-flex flex-lg-row flex-column justify-content-center gap-5 mx-5 my-3 pb-5">
        <div className="col-lg-3 mx-4">
          <div className="col w-100 mb-4">
            <Map lat={countryResult?.latitude} long={countryResult?.longitude} capitalCoordinates={capitalCoordinates} />
          </div>

          <div className="d-flex flex-row justify-content-center mb-4">
            {
            travelAdvisory === 'Country does not exist' ? (
              null
            ) : (
              <iframe
                src={`https://www.travel-advisory.info/widget-no-js?countrycode=${id}`}
                className="rounded"
                style={{ minHeight: 220 }}
              >Country advisory by <a href="https://www.travel-advisory.info/" rel="nofollow">Travel-Advisory.info</a>
              </iframe>
            )
          }
          </div>

          <Tabs
            defaultActiveKey="general"
            className="my-3"
          >
            <Tab eventKey="general" title="General">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Common Name</div>
                    <small>{countryInfo?.name?.common}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Official Name</div>
                    <small>{countryInfo?.name?.official}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Continent</div>
                    <small>{countryInfo?.continents}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Region</div>
                    <small>{countryInfo?.region}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subregion</div>
                    <small>{countryInfo?.subregion}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Population</div>
                    <small>{countryInfo?.population}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  {
                  countryInfo?.capital?.length === 1 ? (
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Capital</div>
                      <small>{countryInfo?.capital}</small>
                    </div>
                  ) : (
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Capitals</div>
                      <ul>
                        {countryInfo?.capital.map((capital, i) => (
                          <li key={i}>
                            <small>{capital}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                }
                </li>
              </ul>
            </Tab>

            <Tab eventKey="additional" title="Additional">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  {Object.keys(countryInfo?.currencies).length <= 5 ? (
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Currencies</div>
                      <ul>
                        {currencies}
                      </ul>
                    </div>
                  ) : (
                    <div className="w-100">
                      <Accordion className="accordion-flush">
                        <Accordion.Item eventKey="0" className="w-100">
                          <Accordion.Header><span className="fw-bold">Currencies</span></Accordion.Header>
                          <Accordion.Body className="ps-4">
                            <ul>
                              {currencies}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  {Object.keys(countryInfo?.languages).length <= 5 ? (
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Languages</div>
                      <ul>
                        {languages}
                      </ul>
                    </div>
                  ) : (
                    <div className="w-100">
                      <Accordion className="accordion-flush">
                        <Accordion.Item eventKey="0" className="w-100">
                          <Accordion.Header><span className="fw-bold">Languages</span></Accordion.Header>
                          <Accordion.Body className="accordion-btn-padding-x-0">
                            <ul className="ps-4">
                              {languages}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  {Object.keys(countryInfo?.timezones).length <= 5 ? (
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Timezones</div>
                      <ul>
                        {timezones}
                      </ul>
                    </div>
                  ) : (
                    <div className="w-100">
                      <Accordion className="accordion-flush">
                        <Accordion.Item eventKey="0" className="w-100">
                          <Accordion.Header><span className="fw-bold">Timezones</span></Accordion.Header>
                          <Accordion.Body className="accordion-btn-padding-x-0">
                            <ul className="ps-4">
                              {timezones}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  )}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Driving Side</div>
                    <small className="text-capitalize">{countryInfo?.car?.side}</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Calling Code</div>
                    <small className="text-capitalize">{countryResult?.phone_code}</small>
                  </div>
                </li>
              </ul>
            </Tab>

            <Tab eventKey="visa" title="Visa Search">
              <div id="iframeCont" className="d-flex flex-row justify-content-center">
                <iframe
                  id="visaIframe"
                  style={{ overflow: 'hidden', height: '500px', minWidth: '350px', border: '0px' }}
                  src="https://visalist.io/widget?dark=false&showheader=true&home=null&destination=null&headercolor=%484A4C&buttoncolor=%D2D2D2"
                  width="100%"
                  scrolling="no"
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-md-8">
          <CountryTabs countryIso2={id} countryNews={countryNews} citiesOptions={options} weatherInfo={weatherInfo} />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [countryInfoRes, countryNewsInfoRes, countryCSCInfoRes, citiesInfoRes, travelAdvisoryRes] = await Promise.all([
    // fetch(`https://restcountries.com/v3.1/alpha/${context.params.countryId}`),
    // fetch(`https://newsapi.org/v2/top-headlines?country=${context.params.countryId}&category=general&apiKey=93393b53981d48379d78d297e6d27d82`)
    axios.get(`https://restcountries.com/v3.1/alpha/${context.params.countryId.toUpperCase()}`),
    axios.get(`https://newsapi.org/v2/top-headlines?country=${context.params.countryId.toUpperCase()}&category=general&apiKey=93393b53981d48379d78d297e6d27d82`),
    axios.get(`https://api.countrystatecity.in/v1/countries/${context.params.countryId.toUpperCase()}`, {
      headers: {
        'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
      }
    }),
    axios.get(`https://api.countrystatecity.in/v1/countries/${context.params.countryId.toUpperCase()}/cities`, {
      headers: {
        'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
      }
    }),
    axios.get(`https://www.travel-advisory.info/widget-no-js?countrycode=${context.params.countryId.toUpperCase()}`)
  ])
  const [countryInfo, countryNews, countryCSCInfo, citiesInfo, travelAdvisory] = await Promise.all([
    countryInfoRes.data,
    countryNewsInfoRes.data,
    countryCSCInfoRes.data,
    citiesInfoRes.data,
    travelAdvisoryRes.data
  ])
  // Pass data to the page via props
  return { props: {
    id: context.params.countryId.toUpperCase(),
    countryInfo: countryInfo[0],
    countryNews,
    countryCSCInfo,
    citiesInfo,
    travelAdvisory
  } }
}

export default withAuth(CountryPage)
