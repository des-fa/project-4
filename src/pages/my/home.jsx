import Map from '@/components-layouts/map'
import { useState } from 'react'
import parse from 'html-react-parser'
import countriesData from '../../data/countries.json'

export default function MyHome() {
  const [value, setValue] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [wikiExtract, setWikiExtract] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = async (searchTerm) => {
    setValue(searchTerm)
    const countryResult = await countriesData.find((country) => country.name.toLowerCase() === searchTerm.toLowerCase())
    // console.log('countryResult ', countryResult)

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
      exsentences: 5,
      titles: searchTerm,
      // srsearch: searchTerm,
      format: 'json'
    }

    url = `${url}?origin=*`
    Object.keys(params).forEach((key) => { url += `&${key}=${params[key]}` })

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // if (response.query.search[0].title === searchTerm) {
        console.log(response)
        const respObject = response.query.pages
        const respPageId = Object.keys(respObject)[0]
        console.log(response.query.pages[respPageId].extract)
        if (response.query.pages[respPageId].title.toLowerCase() === searchTerm.toLowerCase()) {
          const parsedWikiExtract = parse(response.query.pages[respPageId].extract)
          setWikiExtract(parsedWikiExtract)
        }
        // }
      })
      .catch((error) => { console.log(error) })

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
      <div className="row mt-4">
        <div className="col-3">
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
            {/* <button
              type="button"
              className="btn btn-sm btn-dark"
              onClick={() => onSearch(value)}
            >Search</button> */}
          </div>

          <div>
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

          <div>
            {wikiExtract}
          </div>

        </div>

        <div className="col w-100">
          <Map lat={lat} long={long} searchTerm={value} />
        </div>
      </div>

    </div>
  )
}
