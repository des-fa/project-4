import withAuth from '@/hoc/withAuth'
import React from 'react'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

import CountryTabs from '@/components-layouts/CountryTabs'
import countriesData from '../../data/countries.json'

function Country({ id, countryInfo, countryNews }) {
  // const router = useRouter()
  // const { countryId } = router.query
  // console.log('data', countryInfo)
  console.log(countryNews)
  console.log(countryNews?.articles)

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
  //     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${id}&category=general&apiKey=93393b53981d48379d78d297e6d27d82`)
  //     const data = await res.json()
  //     console.log(data)
  //     console.log('news', data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  return (
    <div className="d-flex flex-lg-row flex-column justify-content-center gap-4 mx-4 my-5">
      <div className="col-md-3 mx-4">
        <div className="d-flex flex-row justify-content-center">
          <iframe
            src={`https://www.travel-advisory.info/widget-no-js?countrycode=${id}`}
            className="rounded"
            style={{ minHeight: 220 }}
          >Country advisory by <a href="https://www.travel-advisory.info/" rel="nofollow">Travel-Advisory.info</a>
          </iframe>
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
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Capital</div>
                  <small>{countryInfo?.capital}</small>
                </div>
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
                  <small className="text-capitalize">+{countryResult?.phone_code}</small>
                </div>
              </li>
              <a href={countryInfo?.maps?.googleMaps}>Google</a>
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
                // allowFullScreen
              />
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className="col-md-8 border border-secondary rounded p-4">
        <CountryTabs countryNews={countryNews} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [countryInfoRes, countryNewsInfo] = await Promise.all([
    fetch(`https://restcountries.com/v3.1/alpha/${context.params.countryId}`),
    fetch(`https://newsapi.org/v2/top-headlines?country=${context.params.countryId}&category=general&apiKey=93393b53981d48379d78d297e6d27d82`)
  ])
  const [countryInfo, countryNews] = await Promise.all([
    countryInfoRes.json(),
    countryNewsInfo.json()
  ])
  // Pass data to the page via props
  return { props: {
    id: context.params.countryId,
    countryInfo: countryInfo[0],
    countryNews
  } }
}

export default withAuth(Country)
