import withAuth from '@/hoc/withAuth'
import React from 'react'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

import countriesData from '../../data/countries.json'

function Country({ countryInfo, id }) {
  // const router = useRouter()
  // const { countryId } = router.query
  console.log('data', countryInfo)

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

  // const currencyKey = Object.keys(data?.currencies)
  // console.log(data?.currencies[currencyKey].name)
  // console.log(data?.currencies[currencyKey].symbol)
  // console.log('entries', Object.entries(data?.currencies[currencyKey]))

  // useEffect(async () => {
  //   try {
  //     const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
  //     const data = await res.json()
  //     console.log(data)
  //     setCountryData(data)
  //     console.log('countrydata', countryData)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  return (
    <div className="row mx-4 my-5">
      <div className="col-md-3 ms-4">
        <div>
          <iframe
            src={`https://www.travel-advisory.info/widget-no-js?countrycode=${id}`}
            className="rounded"
            style={{ minHeight: 220 }}
          >Country advisory by <a href="https://www.travel-advisory.info/" rel="nofollow">Travel-Advisory.info</a>
          </iframe>
        </div>

        <Tabs
          defaultActiveKey="main"
          className="my-3"
        >
          <Tab eventKey="main" title="Main">
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
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Capital</div>
                  <small>{countryInfo?.capital}</small>
                </div>
              </li>
            </ul>
          </Tab>

          <Tab eventKey="more" title="More">
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
                  <small className="text-capitalize">+{countryResult?.phone_code}</small>
                </div>
              </li>
              <a href={countryInfo?.maps?.googleMaps}>Google</a>
            </ul>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [countryInfoRes] = await Promise.all([
    fetch(`https://restcountries.com/v3.1/alpha/${context.params.countryId}`)
  ])
  const [countryInfo] = await Promise.all([
    countryInfoRes.json()
  ])
  // Pass data to the page via props
  return { props: {
    countryInfo: countryInfo[0],
    id: context.params.countryId
  } }
}

export default withAuth(Country)
