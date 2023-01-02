import React from 'react'
import Select from 'react-select'

function FormCountrySearch({ initialValue, options, handleChange }) {
  // console.log('initial', initialValue)

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
            // isDisabled={isDisabled}
        name="countryName"
        placeholder="Select or Search"
        noOptionsMessage={() => 'No results'}
        defaultValue={options?.find(({ value }) => value === initialValue)}
        options={options}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormCountrySearch
