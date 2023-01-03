import React, { useState } from 'react'
import Select from 'react-select'

function FormCountrySearch({ initialValue, options, handleChange }) {
  // console.log('initial', initialValue)
  // const [selectedValue, setSelectedValue] = useState(null)

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
        value={initialValue ? (options?.find(({ value }) => value === initialValue)) : (null)}
        options={options}
        onChange={(value) => {
          setValue(value)
          handleChange()
        }}
      />
    </div>
  )
}

export default FormCountrySearch
