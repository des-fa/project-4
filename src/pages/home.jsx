import Map from '@/components-layouts/maps/home-map'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { Image } from 'react-bootstrap'
import withAuth from '@/hoc/withAuth'
import countriesData from '../data/countries.json'

function Home() {
  const [value, setValue] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [countryIso, setCountryIso] = useState('')
  const [wikiExtract, setWikiExtract] = useState('')
  const [wikiPageId, setWikiPageId] = useState('')

  useEffect(() => {
    if (value.length <= 3) {
      setWikiExtract('')
    }
  })

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = async (searchTerm) => {
    setValue(searchTerm)
    const countryResult = await countriesData.find((country) => country.name.toLowerCase() === searchTerm.toLowerCase())
    // console.log('countryResult ', countryResult)
    setCountryIso(countryResult?.iso2)

    setLat(countryResult?.latitude)
    setLong(countryResult?.longitude)

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
      titles: searchTerm,
      // srsearch: searchTerm,
      format: 'json'
    }

    url = `${url}?origin=*`
    Object.keys(params).forEach((key) => { url += `&${key}=${params[key]}` })
    if (countryResult) {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
        // if (response.query.search[0].title === searchTerm) {
          // console.log(response)
          const respObject = response.query.pages
          const respPageId = Object.keys(respObject)[0]
          // console.log(response.query.pages[respPageId].extract)
          if (countryResult) {
            const parsedWikiExtract = parse(response.query.pages[respPageId].extract)
            setWikiExtract(parsedWikiExtract)
            setWikiPageId(respPageId)
            // const word = '(listen)'
            // if (wikiExtract.includes(word)) {
            //   console.log('has listen')
            // }
          }
        // }
        })
        .catch((error) => { console.log(error) })
    }

    // console.log('search ', searchTerm)
    // console.log('lat ', lat)
    // console.log('long ', long)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(value)
    }
  }

  return (
    <div className="container px-3">
      <div className="d-flex flex-lg-row flex-column my-5 gap-5">

        <div className="col-lg-3 col-md-12 me-2">
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search by country"
              aria-label="Search"
              value={value}
              onChange={onChange}
              onKeyUp={handleKeyPress}
            />
          </div>

          <div className="mt-2">
            {countriesData
              .filter((country) => {
                const searchTerm = value.toLowerCase()
                const countryName = country.name.toLowerCase()

                return (
                  searchTerm
                && countryName.startsWith(searchTerm)
                && countryName !== searchTerm
                )
              })
              .slice(0, 10)
              .map((country) => (
                <div
                  key={country.id}
                  onClick={() => onSearch(country.name)}
                >
                  {country.name}
                </div>
              ))}
          </div>

          {wikiExtract ? (
            <div className="d-flex flex-row justify-content-end mt-3">
              <a href={`/countries/${countryIso}`} className="text-decoration-none link-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-info-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </a>
            </div>
          ) : null}

          <div className="mb-4 mt-2 mx-auto text-center" style={{ minHeight: 100 }}>
            {wikiExtract ? (
              <Image
                alt="country-flag"
                src={`https://countryflagsapi.com/png/${countryIso}`}
                width={250}
              />
            ) : null}
          </div>

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
                    className="bi bi-eyeglasses"
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
          <Map lat={lat} long={long} searchTerm={value} />
        </div>
      </div>

    </div>
  )
}

export default withAuth(Home)
