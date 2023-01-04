import React, { useEffect, useState } from 'react'
import Select from 'react-select'

function FormCountrySearch({ initialValue, options, handleChange }) {
  // console.log('initial', initialValue)
  const [selectedValue, setSelectedValue] = useState(null)

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue)
    }
  }, [initialValue])

  return (
    <div className="w-100">
      <Select
        classNamePrefix="select"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'white',
            borderColor: state.isFocused ? 'grey' : 'black'
          })
        }}
        isClearable="true"
        isSearchable="true"
            // isLoading={isLoading}
        name="countryName"
        placeholder="Select or Search"
        noOptionsMessage={() => 'No results'}
        value={options?.find(({ value }) => value === selectedValue)}
        options={options}
        onChange={(e) => {
          // console.log('change', e?.value)
          setSelectedValue(e?.value)
          handleChange(e)
        }}
      />
    </div>
  )
}

export default FormCountrySearch
