import Map from '@/components-layouts/map'
import { useState } from 'react'
// import CountrySearch from '@/forms/CountrySearch'
import countriesData from '../../data/countries.json'

export default function MyHome() {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm)
    // our api to fetch the search result
    console.log('search ', searchTerm)
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

        </div>

        <div className="col w-100">
          <Map />
        </div>
      </div>

    </div>
  )
}
