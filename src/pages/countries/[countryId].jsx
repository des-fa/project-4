import withAuth from '@/hoc/withAuth'
// import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

function Country({ data, id }) {
// calling code, emergency phone number

  // const router = useRouter()
  // const { countryId } = router.query
  console.log('data', data)

  // const currencyKey = Object.keys(data?.currencies)
  // console.log([currencyKey])
  // console.log(data?.currencies[currencyKey].name)
  // console.log(data?.currencies[currencyKey].symbol)
  // console.log('entries', Object.entries(data?.currencies[currencyKey]))

  // console.log('id', id)
  // console.log(Object.keys(data?.currencies))

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
    <div className="row mx-4 my-4">
      <div className="col-3 ms-4">
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
                  <small>{data?.name?.common}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Official Name</div>
                  <small>{data?.name?.official}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Continent</div>
                  <small>{data?.continents}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Region</div>
                  <small>{data?.region}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subregion</div>
                  <small>{data?.subregion}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Population</div>
                  <small>{data?.population}</small>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Capital</div>
                  <small>{data?.capital}</small>
                </div>
              </li>
            </ul>
          </Tab>

          <Tab eventKey="more" title="More">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                {Object.keys(data?.currencies).length <= 5 ? (
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Currencies</div>
                    <ul>
                      {Object.keys(data?.currencies).forEach((key) => {
                        Object.entries(data?.currencies[key]).map(([k, v], i) => (
                          <li key={i}>
                            <small>{k}: {v}</small>
                          </li>
                        ))
                      })}
                    </ul>
                  </div>
                ) : (
                  <div className="w-100">
                    <Accordion className="accordion-flush">
                      <Accordion.Item eventKey="0" className="w-100">
                        <Accordion.Header><span className="fw-bold">Currencies</span></Accordion.Header>
                        <Accordion.Body className="ps-4">
                          <ul>
                            {Object.keys(data?.currencies).forEach((key) => {
                              Object.entries(data?.currencies[key]).map(([k, v], i) => (
                                <li key={i}>
                                  <small>{k}: {v}</small>
                                </li>
                              ))
                            })}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                {Object.keys(data?.languages).length <= 5 ? (
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Languages</div>
                    <ul>
                      {Object.values(data?.languages).map(
                        (value, i) => <li key={i}><small>{value}</small></li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="w-100">
                    <Accordion className="accordion-flush">
                      <Accordion.Item eventKey="0" className="w-100">
                        <Accordion.Header><span className="fw-bold">Languages</span></Accordion.Header>
                        <Accordion.Body className="accordion-btn-padding-x-0">
                          <ul className="ps-4">
                            {Object.values(data?.languages).map(
                              (value, i) => <li key={i}><small>{value}</small></li>
                            )}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                {Object.keys(data?.timezones).length <= 5 ? (
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Timezones</div>
                    <ul>
                      {data?.timezones.map(
                        (timezone, i) => <li key={i}><small>{timezone}</small></li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="w-100">
                    <Accordion className="accordion-flush">
                      <Accordion.Item eventKey="0" className="w-100">
                        <Accordion.Header><span className="fw-bold">Timezones</span></Accordion.Header>
                        <Accordion.Body className="accordion-btn-padding-x-0">
                          <ul className="ps-4">
                            {data?.timezones.map(
                              (timezone, i) => <li key={i}><small>{timezone}</small></li>
                            )}
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
                  <small className="text-capitalize">{data?.car?.side}</small>
                </div>
              </li>
              <a href={data?.maps?.googleMaps}>Google</a>
            </ul>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // console.log(context.params.countryId)
  // Fetch data from external API
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${context.params.countryId}`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: {
    data: data[0],
    id: context.params.countryId
  } }
}

export default withAuth(Country)
